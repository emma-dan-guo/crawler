import React from 'react';
import PropTypes from 'prop-types';

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.init();
    }

    init() {
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
        })
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
                hello world
            </div>
        )
    }
}

export default Map;