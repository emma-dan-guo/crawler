var nodeschedule = require('node-schedule');
var superagent = require('superagent');
var cheerio = require('cheerio');

var utils = require('../util/util');
var config = require('../conf/config');
var mongoose = require('./mongoose');

function getUrl(page) {
    return 'http://cc.58.com/chuzu/pn' + page ;
}

function homeCrawler(url) {
    return new Promise(resolve => {
        superagent
            .post(url)
            .set("Accept-Language", "en-US,en")
            .set("Accept-Encoding", "gzip")
            .set("Accept", "text/html")
            .set("Accept-Charset", "utf-8")
            .set('User-Agent', 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11')
            .end(((err, result) => {
                var $ = cheerio.load(result.res.text);
                var rentalHref = [];
                $('.listUl>li').each(((i,li) => {
                    rentalHref.push($(li).find('.img_list>a').attr('href'));
                }))
                rentalHref.pop();
                resolve(rentalHref);
            }))
    });
}

function detailCrawler(url) {
    var infoList = [];
    return new Promise(resolve => {
        superagent
            .post(url)
            .set("Accept-Language", "en-US,en")
            .set("Accept-Encoding", "gzip")
            .set("Accept", "text/html")
            .set("Accept-Charset", "utf-8")
            .set('User-Agent', 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11')
            .end((error, result) => {
                if (!error) {
                    var $ = cheerio.load(result.res.text);
                    var rentalDetailInfo = {};
                    rentalDetailInfo.url = url;
                    rentalDetailInfo.price = $('.house-basic-desc').find('.f36').text().replace(/[^\d]/g, '');
                    var desc = $('.house-basic-desc').find('.f14>li').each((i, li) => {
                        // 数组i下标对应： 0代表的是租赁方式，1代表的是房屋类型，
                        $(li).children('span').each((j, span) => {
                            if(j === 1) {
                                switch (i) {
                                    case (0):
                                        { // 租赁方式
                                            rentalDetailInfo['methods'] = $(span).text().trim();
                                            break;
                                        }
                                    case (1):
                                        {
                                            var tmp = $(span).text().trim().replace(/\s+/g, ' ').split(' ');
                                            rentalDetailInfo['type'] = tmp[0];
                                            rentalDetailInfo['square'] = tmp[1];
                                            break;
                                        }
                                    case (2):
                                        { // 朝向
                                            rentalDetailInfo['direction'] = $(span).text().trim().replace(/\s+/g, ' ').split(' ')[0];
                                            break;
                                        }
                                    case (3): { 
                                        rentalDetailInfo['houseAreas'] = $(span).text().trim();
                                    }
                                    case (4):
                                        {
                                            var tmp = $(span).text().trim().replace(/\s+/g, ' ').split(' ');
                                            rentalDetailInfo['areas'] = tmp[0];
                                            break;
                                        }
                                }
                            }
                        });
                    });
                    infoList.push(rentalDetailInfo);
                } else {
                    console.error(error);
                }
                resolve(infoList);
            })
    })
}

async function handleRestCrawler(arr) {
    let iNum = parseInt(arr.length / 100) + 1;
    var infoArr = [];
    for (let i = 0; i < iNum; i++) {
        setTimeout(async function() {
            let a = arr.splice(0, 100);
            let tmpArr = await Promise.all(a);
            infoArr.concat(utils.flatten(tmpArr));
            console.log('infoArr', infoArr);
        }, 1000 * 60);
    }
}

module.exports = {
    init: async function () {
        nodeschedule.scheduleJob('5 * * * * *', async function () {
            console.log('爬取数据....');
            var PromiseArr = [];
            for (let i = 0; i < config.spiderConfig.page; i++) {
                PromiseArr.push(homeCrawler(getUrl(i)));
            }
            var hrefList = new Set(utils.flatten(await Promise.all(PromiseArr)));
            hrefList = Array.from(hrefList);
            // console.log('hrefList', hrefList);
            // hrefList = [hrefList[0]];
            var detailCrawlerfunc = hrefList.map(v => detailCrawler(v));
            // var rentalDetailInfoList = await handleRestCrawler(detailCrawlerfunc);
            var rentalDetailInfoList = utils.flatten(await Promise.all(detailCrawlerfunc));
            var finalInfoList = utils.transFormData(rentalDetailInfoList);
            console.log('finalInfoList', finalInfoList);
            // console.log('rentalDetailInfoList', finalInfoList);
            var newNumber = await new Promise((resolve) => {
                var newDataNumber = 0;
                var i = 0;
                finalInfoList.forEach((item) => {
                    mongoose.add(item).then((isSuccess => {
                        i++;
                        isSuccess && newDataNumber++;
                        if (i == finalInfoList.length - 1) {
                            resolve(newDataNumber);
                        }
                    }));
                });
            });
            console.log(`总共抓取数据${rentalDetailInfoList.length}条，其中抓取新数据${newNumber}条`);
        });
    }
}