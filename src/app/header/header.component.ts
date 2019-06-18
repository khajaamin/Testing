import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Injectable } from "@angular/core";
import { Globals } from './globals';
import { fabric } from 'fabric';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  private json: any;
  marked = false;
  public textString: string;
  canvas: any;
  title = 'Angular Site';
  selectItemAfterAdded: any;
  uploadNewImage : any;
  url : any;
  
  constructor(private httpService: HttpClient) { }
  private appObject: Function;
  
  
  ngOnInit() {

    $('.left_panel').css("text-align","-webkit-right");
    
    if($("html")) {
       $("#myCanvas").css("background-size","cover");
    }   
    
    var lf_w = $("#myCanvas").width();
    var lf_h = $("#myCanvas").height();
    
    $('.form-control').hide();
    $('#text-cont').hide();
    var imageLoader = document.getElementById('imageLoader');

    this.canvas = new fabric.Canvas('myCanvas', {
    selection: false,
    uniScaleTransform: true
    });
    this.canvas.uniScaleTransform = true;

 this.appObject = ()=>{

  return {
    __canvas: this.canvas,
    __tmpgroup: {},

    addText: function() {


      var imgURL = 'http://i.imgur.com/8rmMZI3.jpg';

      var canvas = new fabric.Canvas('canvas');

      var pugImg = new Image();
      pugImg.onload = (img)=> {    
          var pug = new fabric.Image(pugImg, {
              angle: 45,
              width: 500,
              height: 500,
              left: 50,
              top: 70,
              scaleX: .25,
              scaleY: .25
          });
          this.__canvas.add(pug);
      };
      pugImg.src = imgURL;

      var newID = (new Date()).getTime().toString().substr(5);
      var text = new fabric.IText('New Text', {
        fontFamily: 'Times New Roman',
        left: 100,
        top: 100,
        myid: newID,
        objecttype: 'text'
      });

      console.log(text.fontFamily);
 
      this.__canvas.add(text);
      //this.addLayer(newID, 'text');
      console.log("--",this.__canvas.toJSON() ); 

    },
    setTextParam: function(param, value) {
      var obj = this.__canvas.getActiveObject(); 
      if (obj) {
       
        if (param == 'color') {
          obj.setColor(value);
        } else {
          obj.set(param, value);
        }
        this.__canvas.renderAll();
      }
    },
    setTextValue: function(value) {
      var obj = this.__canvas.getActiveObject();
      if (obj) {
        obj.setText(value);
        this.__canvas.renderAll();
      }
    },
    addLayer: function() {

    }

  };
} 


  var app = this.appObject();

  $('.font-change').change(function(event) {
    app.setTextParam($(this).data('type'), $(this).find('option:selected').val());
  });

  $('#add').click(function() {
    app.addText();
  });
  $('#text-cont').keyup(function() {
    app.setTextValue($(this).val());
  })


}
  // ZOOM Functions testing
  zoomin(e) {
        $("#myCanvas").css("zoom","110%"); 
        $(".left_pannel").css("zoom","110%"); 
  }
  zoomout(e) {
        $("#myCanvas").css("zoom","110%"); 
        $(".left_pannel").css("zoom","90%"); 
  }
  
  // Guidelines
  add(e) {
      this.marked= e.target.checked;
      $('#myCanvas').css({
        'border': '2px dashed black',
        'margin':'0px'
      });
      $('#left').css({
        'border': '2px dashed red',
        'margin-left':'20px'
      });
      // alert("cHANGE eVENT");
        if(!(this.marked)) {
          $('#myCanvas').css("border","");
        }
}

onSelectFile(event) {
  this.uploadNewImage = true; 
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    
    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event:any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
      // alert(this.url);
    }
    
    
    fabric.Image.fromURL(this.url, (img) => {
      this.canvas.add(img);
    });
  }
}

// rasterizeJSON() {
//   var json = JSON.stringify(this.canvas);
//   console.log((this.canvas));
//   localStorage.setItem('mycanvas', json);
//   this.json = JSON.stringify(this.canvas, null, 2);
//   // alert(this.json);
// }

}
