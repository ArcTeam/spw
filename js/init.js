/*
3DHOP - 3D Heritage Online Presenter
Copyright (c) 2014, Marco Callieri - Visual Computing Lab, ISTI - CNR
All rights reserved.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function init3dhop() {
    var interval, id, ismousedown;
    var button = 0;
    $('#toolList li')
        .mouseenter(function(e) { id = $(this).attr('id'); })
        .mouseout(function(e) { clearInterval(interval); })
        .mousedown(function(e) {
            ismousedown = true;
            if(e.button==button){
                actionsToolbar(id);
                if(id == "zoomin" || id == "zoomout"){  interval = setInterval(function(){ actionsToolbar(id); }, 100); }
                else {clearInterval(interval); }
                button=0;
            }
        })
        .mouseup(function(e) {
            ismousedown = false;
            if(e.button==button){
                clearInterval(interval);
                $(this).css("opacity","0.8");
                button=0;
            }
        })
        .on('touchstart', function(e) { button=2; })
        .on('touchend', function(e) {button=0;});
    $('#measure-output').on('contextmenu', function(e){ e.stopPropagation();});

    $('#3dhop')
        .on('touchend', function(e) {clearInterval(interval); })
        .on('touchmove', function(e) {clearInterval(interval);})
    ;
    resizeCanvas($('#3dhop').width(),$('#3dhop').height());
}

function lightSwitch() {
    var on = presenter.isLightTrackballEnabled();
    if(on){$('#light').attr("id",'light_on');}else{ $('#light_on').attr("id",'light'); }
}
function resizeCanvas(w,h) {
  $('#draw-canvas').attr('width', w);
  $('#draw-canvas').attr('height',h);
  $('#3dhop').css('width', w);
  $('#3dhop').css('height', h);
}

function getDevice(){
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}
function setMenu(){
  var get = getDevice();
  //var set;
  if (get){
    //set = 'mobile';
    $("#thumb").hide();
  }else{
    $("#showMobile").hide();
    //set = "desktop";
  }
  //return set;
}
