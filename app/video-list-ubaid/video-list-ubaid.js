
import { ubdVideoListViewModel } from "./video-list-view-model-ubaid";

import { getViewById } from "@nativescript/core";
import { getSelectedItems } from "nativescript-ui-listview";


//var Animation = require("tns-core-modules/ui/animation").Animation;
var navigator = require("../../common/navigator");

var page 
var parent
let listView;

export function pageLoaded(args){
     page = args.object;
     listView = page.getViewById("todo-list");
     page.bindingContext = ubdVideoListViewModel() 
     parent = page.parent;    
 
}

export function goBack() {
    navigator.navigateBackFromExample()
    
}



export function changeArrowIcon(args){
     if (args.view._subViews[1].text == "\uf078") {
        args.view._subViews[1].text = "\uf077";   
     }
     else {
        args.view._subViews[1].text = "\uf078";
     }
} 



export function showSubjectDetails(args){
   // args.view.backgroundColor = "#b3ecff";
    if (args.view._subViews[1].visibility === 'collapse') {
        args.view._subViews[1].visibility = "visible";
       

        args.view._subViews[1].animate({
            translate: {
                x: 0,
                y: 10
            },
            duration: 400,
            
        });
        
         
    }
    else {
        args.view._subViews[1].animate({
            translate: {
                x: 0,
                y: -10
            },
             duration: 300,
            
        }).then(() => { 
            console.log("Animation finished");
            args.view._subViews[1].visibility = "collapsed";
        })
        .catch((e) => {
            console.log(e.message);
        });
        
       
    }
    
   


    
}

export function rippleOnTouch (args) {
    const defaultClassName = args.object.className

    args.object.className = "ripple"  ;
  
    setTimeout(
      function () {
        args.object.className = defaultClassName;
      }, 500);
  
  }



//** GETTING DATA OF INDIVIDUAL ITEMS FROM RADLISTVIEW */
// export function onItemSelected(args) {
    //args.itemIndex % 2 == 0
//     const selectedItems = args.object.getViewById('todo-list').getSelectedItems();
//     let selectedTitles = "Selected items: " ;

//     // for (let i = 0; i < selectedItems.length; i++) {
//     //     selectedTitles += selectedItems[i].index;

//     //     if (i < selectedItems.length - 1) {
//     //         selectedTitles += ", ";
//     //     }
//     // }
//     console.log('lv: ' + selectedItems[0].index)


