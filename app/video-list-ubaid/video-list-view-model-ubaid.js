import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

var appSettings = require("application-settings");
var VideoListViewModel1 = require("../../shared/view-models/video-list-view-model");
var videolListViewModel1 = new VideoListViewModel1([]);

//var viewModule = require ("ui/core/view");
var imgUrl = "https://i.ytimg.com/vi/BsDoLVMnmZs/maxresdefault.jpg"

  export function ubdVideoListViewModel() {
    var subjectData = new Observable()
    
    var videolList = new ObservableArray();
    var idList = new ObservableArray();
    

    
    //subjectData.set("hideSubjectDetails", "")

    subjectData.set("subject", appSettings.getString('subject'))
    //appSettings.getString('subject')

    
     

    // subjectData.loadVideoData = function(){
    videolList = new ObservableArray()   
    subjectData.set("videolList", videolList)
    subjectData.textHello = 'hello'
    subjectData.set("idList", idList)
    

    
    videolListViewModel1.empty();
    videolListViewModel1.load().catch(function (error) {
        subjectData.load(true);
        return Promise.reject();
    }).then(function (msg) {
        for (var i = 0; i < videolListViewModel1.length; i++) {
            videolList.push(videolListViewModel1.getItem(i));
            //idList.push(videolListViewModel1.getItem(i).id);
            console.log('video data: ' + videolListViewModel1.length)
        };
        subjectData.set("SubjectDetails", "dfkldjfkdljflkajfl")
        subjectData.set("totalVideos", "Total recordings: " + videolListViewModel1.length)
        
        subjectData.load(true);
    });



    videolList.showSubjectDetails =  function (args){
        // let obj = args.object;
        // let parent = obj.parent;
        if (parent) {
            // let lblDescription = getViewById(parent, "lblArrow");
            lblDescription = page.getViewById('lblDescription')
            if (lblDescription.visibility === 'visible') {
                subjectDetailsVisible = 'collapsed'
                 
                 lblDescription.visibility= subjectDetailsVisible
                 console.log('showSubjectDetails' + parent + '.' + lblDescription + ' ' + subjectDetailsVisible )
            }
             //if(lblDescription.visibility === 'collapsed')
            //  else{
            //     subjectDetailsVisible = 'visible'
                
            //      lblDescription.visibility= subjectDetailsVisible
            //      console.log('showSubjectDetails' + parent + '.' + lblDescription + ' ' + subjectDetailsVisible )
            // }
        }
    }
    

    



    
    return subjectData;

}


// }

























//   }

  
    // videoData.push( {
    //     img: imgUrl,
    //     fileName: "HTML Complete Course #5",
    //     description: "HTML5 Complete course with download notes and other materials",
    //     month: "Jan",
    //     year: "2023",
    //     addedOn: "2 days ago",
    //     track: "Weekday Slow - Track 1",
    //     facultyName: "Harry Bhai"
        
        
    // });

    
    

 
