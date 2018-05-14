import React from 'react';
import PropTypes from 'prop-types';

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.init();
    }

    getInfosSuc(data) {
        var params = data.params;
        var szPois = [];
        for (var url in params) {
            var localSearch = new BMap.LocalSearch(map);
            localSearch.setSearchCompleteCallback((function (url, infos) {
                var hasShowUrls = [];
                return function (searchResult) {
                    for (var j = 0; j < hasShowUrls.length; j++) {
                        if (url === hasShowUrls[j]) {
                            return;
                        };
                    }
                    hasShowUrls.push(url);
                    var poi = searchResult.getPoi(0); /*地理位置信息*/
                    if (!poi) return;
                    var isHasPoi = false;
                    for (var i = 0; i < szPois.length; i++) {
                        if (szPois[i].point.lng === poi.point.lng && szPois[i].point.lat === poi.point.lat) {
                            isHasPoi = true;
                            break;
                        };
                    }

                    if (isHasPoi) { /*同一个小区有多套房子*/
                        var point = new BMap.Point(poi.point.lng, poi.point.lat);
                        szPois[i].urls.push(url);
                        szPois[i].imgs.push(infos.img);
                        szPois[i].marker.addEventListener("click", (function (p) {
                            return function () {
                                /*点击房屋图标后弹出的信息框*/
                                var opts = {
                                    width: 200,
                                    height: 200 * p.urls.length,
                                    title: poi.title,
                                    enableMessage: true
                                }
                                var message = "";
                                p.urls.forEach(function (item, index) {
                                    message += "<div><a href=" + item + "><img title='点击访问' class='img-responsive showImg' alt='Responsive image' src=" + p.imgs[index] + "></img></a></div>"
                                })
                                var infoWindow = new BMap.InfoWindow(message, opts);
                                map.openInfoWindow(infoWindow, point); //开启信息窗口
                            }
                        })(szPois[i]));
                    } else {
                        var point = new BMap.Point(poi.point.lng, poi.point.lat);

                        var myIcon = new BMap.Icon("../image/house.png", new BMap.Size(30, 30), {});
                        // 创建标注对象并添加到地图   
                        var marker = new BMap.Marker(point, {
                            icon: myIcon
                        });
                        map.addOverlay(marker);

                        marker.addEventListener("click", function () {
                            /*点击房屋图标后弹出的信息框*/
                            var opts = {
                                width: 200,
                                height: 200,
                                title: poi.title,
                                enableMessage: true
                            }
                            var infoWindow = new BMap.InfoWindow("<a href=" + url + "><img title='点击访问' class='img-responsive showImg' alt='Responsive image' src=" + infos.img + "></img></a>", opts);
                            map.openInfoWindow(infoWindow, point); //开启信息窗口
                        });

                        poi.marker = marker;
                        poi.urls = [url];
                        poi.imgs = [infos.img]
                        szPois.push(poi);
                    }

                    　　
                }
            })(url, params[url]));
            localSearch.search(params[url].location);
        }
    }


    init() {
        const {tableList} = this.props;
        var map = new BMap.Map("mapContainer");
        map.centerAndZoom("长春", 15);
        map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                mk.setAnimation(BMAP_ANIMATION_BOUNCE); /*动画跳动*/
            } else {
                alert('failed' + this.getStatus());
            }
        }, {
            enableHighAccuracy: true
        });
        this.getInfosSuc(tableList);
    }

    getCurrentPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(111111);
            }, function (error) {
                console.log(error);
            });
            console.log(222);
        }
    }

    render() {
        return (
            <div id="mapContainer">
            </div>
        )
    }
}

export default Map;