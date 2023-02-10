
import { MyTicketsViewModel } from './my-tickets-view-model';
//var MyTicketsViewModel = require("./my-tickets-view-model");

const firebase = require("@nativescript/firebase").firebase;
frame = require("ui/frame")
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var observableModule = require("data/observable")
var navigator = require("../../common/navigator");
var frame = require("ui/frame");
const appSettings = require("application-settings");
const platform = require("platform");
const isIOS = platform.device.os === platform.platformNames.ios;
const isAndroid = platform.device.os === platform.platformNames.android;
var config = require("../../shared/config");
const pageVisitAnalytics = require("../../common/analytics");
var initialTimeStamp = 0
var moment = require("moment");;
const screenName = "my-tickets";

var page

var myTicketsViewModel = new MyTicketsViewModel();

var openTicketsSearchBar
var closedTicketsSearchBar
var feedbacksTicketsSearchBar

var openTicketsTimeOut
var closedTicketsTimeOut
var feedbacksTicketsTimeOut


if (isIOS) { 
    myTicketsViewModel = new MyTicketsViewModel();
  }

 


export function pageLoaded(args) {

    //var myTicketsViewModel = new MyTicketsViewModel();

    console.log("----- pageLoaded called from normal JS ------" + args.object.isPageloaded)
    firebase.analytics.setScreenName({
        screenName: screenName
      }).then(
        function () {
          console.log("Screen name set");
        }
      );
      initialTimeStamp = moment().valueOf()
      pageVisitAnalytics.pageVisitLog("/views/" + screenName, initialTimeStamp, 0)
      const app = require("application");
      var actionTitle = args.object.page.getViewById("actionTitle")

      if (appSettings.getString("portalType") == "V2") {
        const updateDrawer = require("../my-tickets/my-tickets.js").updateDrawer;
        updateDrawer.updateSelection("E-Learn")
      }


      ////////////////  SEARCHBAR  FUNCTIONS   ////////////////
      if (!args.object.isPageloaded) {
        args.object.isPageloaded = true
        if (isAndroid) {  
          myTicketsViewModel = new MyTicketsViewModel();
        }

        var page = args.object

        //SearchBar for Open Tickets
        openTicketsSearchBar = page.getViewById("searchBarOpenTickets");
        if (openTicketsSearchBar.android)
            openTicketsSearchBar.android.clearFocus();
         
        openTicketsSearchBar.on("textChange", function () {
          let text = openTicketsSearchBar.text;
          clearInterval(openTicketsTimeOut);

          openTicketsTimeOut = setTimeout(function () {
            myTicketsViewModel.searchOpenTickets(text)
          }, 500);

        });

        //SearchBar for Closed Tickets
        closedTicketsSearchBar = page.getViewById("searchBarClosedTickets");
        if (closedTicketsSearchBar.android)
            closedTicketsSearchBar.android.clearFocus(); 
        closedTicketsSearchBar.on("textChange", function () {
          let text = closedTicketsSearchBar.text;
          clearInterval(closedTicketsTimeOut);

          closedTicketsTimeOut = setTimeout(function () {
            myTicketsViewModel.searchClosedTickets(text) 
          }, 1500);

        });

        //SearchBar for Feedback Tickets
        feedbacksTicketsSearchBar = page.getViewById("searchBarFeedbacksTickets");
        feedbacksTicketsSearchBar.android.clearFocus(); 
        feedbacksTicketsSearchBar.on("textChange", function () {
          let text = feedbacksTicketsSearchBar.text;
          clearInterval(feedbacksTicketsTimeOut);

          feedbacksTicketsTimeOut = setTimeout(function () {
            myTicketsViewModel.searchFeedbacksTickets(text) 
          }, 1500);

        });

        
    
      }
      
    

}




////////////////  RELOAD FUNCTIONS   ////////////////
export function reloadOpenTickets(){
  myTicketsViewModel.reloadOpenTickets()
}

export function reloadClosedTickets(){
  myTicketsViewModel.reloadClosedTickets()
}

export function reloadTicketsFeedback(){
  myTicketsViewModel.reloadTicketsFeedback()
}



////////////////  PULL TO REFRESH FUNCTIONS   ////////////////

export function pullToRefreshOpenTickets(args) {
    setTimeout(() => {
        myTicketsViewModel.reloadOpenTickets()
      args.object.refreshing = false;
      if (!isIOS) {
        args.object.notifyPullToRefreshFinished(true);
      }
    }, 200);
  }

  export function pullToRefreshClosedTickets(args) {
    setTimeout(() => {
        myTicketsViewModel.reloadClosedTickets()
      args.object.refreshing = false;
      if (!isIOS) {
        args.object.notifyPullToRefreshFinished(true);
      }
    }, 200);
  }

  export function pullToRefreshfeedbacksTickets(args) {
    setTimeout(() => {
        myTicketsViewModel.reloadTicketsFeedback()
      args.object.refreshing = false;
      if (!isIOS) {
        args.object.notifyPullToRefreshFinished(true);
      }
    }, 200);
  }



  export function onUnloaded(args) {
    
    pageVisitAnalytics.pageVisitLog("/views/" + screenName, initialTimeStamp, moment().diff(initialTimeStamp))
    console.log("onUnLoaded called")
    console.log("args.object.isPageloaded: " + args.object.isPageloaded)
  }
  
  
  export function onSubmit(args) {
    openTicketsSearchBar.dismissSoftInput();
    closedTicketsSearchBar.dismissSoftInput();
    feedbacksTicketsSearchBar.dismissSoftInput();
    console.log("tap submit: "  )
    
  }

  
  
  export function goBack(args) {
    openTicketsSearchBar.dismissSoftInput();
    closedTicketsSearchBar.dismissSoftInput();
    feedbacksTicketsSearchBar.dismissSoftInput();
    navigator.navigateBackFromExample();
      
  }




  

////////////////  FUNCTIONS TO LOAD TICKETS  ////////////////

export function closedTicketsLoaded(args) {
    console.log("----- closedTicketLoaded  called from normal JS ------")
    
    if(!args.object.isPageloaded){
      args.object.isPageloaded  = true
      myTicketsViewModel.loadClosedTickets();
      var page = args.object;
      page.bindingContext = myTicketsViewModel;
    }
    
    
}


export function openTicketLoaded(args) {
    console.log("----- openTicketLoaded  called from normal JS ------")

    if(!args.object.isPageloaded){
      args.object.isPageloaded  = true
      myTicketsViewModel.loadOpenTickets();
      var page = args.object;
      page.bindingContext = myTicketsViewModel;
    }
      
}


export function feedbacksTicketLoaded(args) {
    console.log("-----  feedbacksTicketsLoaded called from normal JS ------")

    if(!args.object.isPageloaded){
      args.object.isPageloaded  = true
      myTicketsViewModel.loadTicketsFeedback();
      var page = args.object;
      page.bindingContext = myTicketsViewModel;
    }
  
    
    }

    
    





