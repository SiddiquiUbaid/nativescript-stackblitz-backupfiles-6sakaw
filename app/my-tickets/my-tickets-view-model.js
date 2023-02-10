//var observableObj = require("data/observable")

import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";

var MyTicketsOpenViewModel = require("../../shared/view-models/my-tickets-open-shared-view-model");
var myTicketsOpenViewModel = new MyTicketsOpenViewModel();


const MyTicketsClosedViewModel = require("../../shared/view-models/my-tickets-closed-shared-view-model");
var myTicketsClosedViewModel = new MyTicketsClosedViewModel();

const MyTicketsFeedbacksViewModel = require("../../shared/view-models/my-tickets-feedbacks-shared-view-model");
var myTicketsFeedbacksViewModel = new MyTicketsFeedbacksViewModel();

var itemsOpenTickets

let viewModel = new Observable();
itemsOpenTickets = new ObservableArray([]);



export function MyTicketsViewModel(){
  console.log("-----------------> ubaid MyTickets viewmodel call... ");


  
////////////////////////////////////////  RELOAD TICKETS FUNCTIONS  ////////////////////////////////////////

  viewModel.reloadOpenTickets = function () {
    
    console.log("-------------->>>>>>>>>>> reload openTickets called")
    viewModel.set("openTickets_isLoading", true)
    viewModel.set("no_data1", "collapse")
    viewModel.set("no_internet1", "collapse")
    viewModel.set("serverdown1", "collapse")
    viewModel.set("data1", "collapse")
    viewModel.loadOpenTickets()
}


  viewModel.reloadClosedTickets = function () {
    
    console.log("-------------->>>>>>>>>>> reload closedTickets called")
    viewModel.set("closedTickets_isLoading", true)
    viewModel.set("no_data2", "collapse")
    viewModel.set("no_internet2", "collapse")
    viewModel.set("serverdown2", "collapse")
    viewModel.set("data2", "collapse")
    viewModel.loadClosedTickets()
}

  viewModel.reloadTicketsFeedback = function () {
    
    console.log("-------------->>>>>>>>>>> reload ticketsFeedback called")
    viewModel.set("feedbackTickets_isLoading", true)
    viewModel.set("no_data3", "collapse")
    viewModel.set("no_internet3", "collapse")
    viewModel.set("serverdown3", "collapse")
    viewModel.set("data3", "collapse")
    viewModel.loadTicketsFeedback()

}



////////////////////////////////////////  SEARCH TICKETS FUNCTIONS  ////////////////////////////////////////


// Search function for Open Tickets
viewModel.searchOpenTickets = function(text){
  viewModel.set("openTickets_isLoading", true) 
  viewModel.set("data1", "collapse")

  if(text == ""){
    console.log("if----------------")
    viewModel.set("openTicketsSearchBarVisibility", "visible")
    viewModel.set("no_data1", "collapse")
    viewModel.set("data1", "visible")
    viewModel.set("openTickets_isLoading", false)
    viewModel.set("studentMyTicketsOpenList", myTicketsOpenViewModel)
    

  }
  else{
    console.log("else----------------") 
    viewModel.set("data1", "collapse")

    var searchOpenTickets = myTicketsOpenViewModel.filter(function(value, index, array) {
      var subject = value.subject
      var ticketNo = value.ticketNo
      var openDate = value.openDate
      var statusColor = value.statusColor
      var requestStatus = value.requestStatus
      var inProgressDate = value.inProgressDate
      var expectedCloseDate = value.expectedCloseDate
      var isEscalate = value.isEscalate

      var searchString = text.toLowerCase();

      if(subject){
        if(subject.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(ticketNo){
        if(ticketNo.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(openDate){
        if(openDate.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(statusColor){
        if(statusColor.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(requestStatus){
        if(requestStatus.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(inProgressDate){
        if(inProgressDate.toLowerCase().indexOf(searchString) > -1) return value;
      } 
      if(expectedCloseDate){
        if(expectedCloseDate.toLowerCase().indexOf(searchString) > -1) return value;
      } 
        // if(isEscalate){
        //     if(isEscalate.toLowerCase().indexOf(searchString) > -1) return value;
        // }
      });
      viewModel.set("openTickets_isLoading", false);
      viewModel.set("studentMyTicketsOpenList", searchOpenTickets);
      
      if(searchOpenTickets.length==0){ 
        viewModel.set("no_data1", "visible")
        console.log("result search array length is " + searchOpenTickets.length + " :( ) ")
      }else{
        viewModel.set("no_data1", "collapse")
        viewModel.set("no_internet1", "collapse")
        viewModel.set("serverdown1", "collapse")
        viewModel.set("data1", "visible")
        console.log("result search array length is " + searchOpenTickets.length )
      }
  }
}



// Search function for Closed Tickets
viewModel.searchClosedTickets = function(text){
  viewModel.set("closedTickets_isLoading", true)
  //viewModel.set("data2", "collapse")

  if(text == ""){
    console.log("if----------------")
    viewModel.set("closedTicketsSearchBarVisibility", "visible")//--
    viewModel.set("no_data2", "collapse")
    viewModel.set("data2", "visible")
    viewModel.set("closedTickets_isLoading", false)
    viewModel.set("studentMyTicketsClosedList", myTicketsClosedViewModel)
    

  }
  else{
    console.log("else----------------") 
    //viewModel.set("data2", "collapse")

    var searchClosedTickets = myTicketsClosedViewModel.filter(function(value, index, array) {
      var subject = value.subject
      var ticketNo = value.ticketNo
      var openDate = value.openDate
      var statusColor = value.statusColor
      var requestStatus = value.requestStatus
      var closeDate = value.closeDate

      var searchString = text.toLowerCase();

      if(subject){
        if(subject.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(ticketNo){
        if(ticketNo.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(openDate){
        if(openDate.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(statusColor){
        if(statusColor.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(requestStatus){
        if(requestStatus.toLowerCase().indexOf(searchString) > -1) return value;
      }
      
      if(closeDate){
        if(closeDate.toLowerCase().indexOf(searchString) > -1) return value;
      } 
        
      });
      viewModel.set("closedTickets_isLoading", false);
      viewModel.set("studentMyTicketsClosedList", searchClosedTickets);
      
      if(searchClosedTickets.length==0){ 
        viewModel.set("no_data2", "visible")
        console.log("result search array length is " + searchClosedTickets.length + " :(  ")
      }else{
        viewModel.set("no_data2", "collapse")
        viewModel.set("no_internet2", "collapse")
        viewModel.set("serverdown2", "collapse")
        viewModel.set("data2", "visible")
        console.log("result search array length is " + searchClosedTickets.length )
      }
  }
}



// Search function for Feedbacks Tickets
viewModel.searchFeedbacksTickets = function(text){
  viewModel.set("feedbackTickets_isLoading", true)
  //viewModel.set("data3", "collapse")

  if(text == ""){
    console.log("if----------------")
    viewModel.set("feedbacksTicketsSearchBarVisibility", "visible")//--
    viewModel.set("no_data3", "collapse")
    viewModel.set("data3", "visible")
    viewModel.set("feedbackTickets_isLoading", false)
    viewModel.set("ticketsFeedbacksList", myTicketsFeedbacksViewModel)
    

  }
  else{
    console.log("else----------------") 
    //viewModel.set("data2", "collapse")

    var searchFeedbacksTickets = myTicketsFeedbacksViewModel.filter(function(value, index, array) {
      var subject = value.subject
      var openDate = value.openDate
      var statusColor = value.statusColor
      var requestStatus = value.requestStatus
      
      var searchString = text.toLowerCase();

      if(subject){
        if(subject.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(openDate){
        if(openDate.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(statusColor){
        if(statusColor.toLowerCase().indexOf(searchString) > -1) return value;
      }
      if(requestStatus){
        if(requestStatus.toLowerCase().indexOf(searchString) > -1) return value;
      }
       
      });
      viewModel.set("feedbackTickets_isLoading", false);
      viewModel.set("ticketsFeedbacksList", searchFeedbacksTickets)
    
      
      if(searchFeedbacksTickets.length==0){ 
        viewModel.set("no_data3", "visible")
        console.log("result search array length is " + searchFeedbacksTickets.length + " :(  ")
      }else{
        viewModel.set("no_data3", "collapse")
        viewModel.set("no_internet3", "collapse")
        viewModel.set("serverdown3", "collapse")
        viewModel.set("data3", "visible")
        console.log("result search array length is " + searchFeedbacksTickets.length )
      }
  }
}







////////////////////////////////////////  LOAD TICKETS FUNCTIONS  ////////////////////////////////////////


  //method for loading feedback tickets
  viewModel.loadTicketsFeedback = function(args){ 
  
  myTicketsFeedbacksViewModel.empty();  // <--- none of use
  //viewModel.set("feedbackTickets_isLoading", true)
  myTicketsFeedbacksViewModel.loadTicketsFeedback().then(
      function(msg){
        if(msg == "success"){
          console.log("msg: " + msg)
          viewModel.set("ticketsFeedbacksList", myTicketsFeedbacksViewModel)
          //console.log("under loadTicketsFeedback().then : " + Object.values(myTicketsFeedbacksViewModel))
          viewModel.set("feedbackTickets_isLoading", false)
          viewModel.set("data3", "visible")
          
          
        }
        else if (msg == "no_data") {
          viewModel.set("no_data3", "visible")
        }
        else if (msg == "Error: java.net.ConnectException: Connection refused" || msg == "Error: java.net.ConnectException: Connection timed out" || msg == "Error: java.net.NoRouteToHostException: No route to host") {
          viewModel.set("no_internet3", "visible")
        }
        else{
          viewModel.set("serverdown3", "visible")
        }
        viewModel.set("feedbackTickets_isLoading", false)
      }
    ).catch(
      function(error){
        console.log("error: " + error)
        if (error == "no_data") {
          viewModel.set("no_data3", "visible")
        }
        else {
          viewModel.set("serverdown3", "visible")
        }
        viewModel.set("feedbackTickets_isLoading", false)
        return Promise.reject();
        }

    );
                                         
} 


 viewModel.loadOpenTickets = function(args){ 

  myTicketsOpenViewModel.empty();  // <--- none of use
  myTicketsOpenViewModel.loadOpenTickets().then(
      function(msg){
        if(msg == "success"){
          console.log("msg: " + msg)
          viewModel.set("studentMyTicketsOpenList", myTicketsOpenViewModel)
          //console.log("under loadTicketsFeedback().then : " + myTicketsOpenViewModel)
          viewModel.set("openTickets_isLoading", false)
          viewModel.set("openTicketsSearchBarVisibility", "visible")
          viewModel.set("data1", "visible")
          
          
        }
        else if (msg == "no_data") {
          viewModel.set("no_data1", "visible")
          viewModel.set("openTicketsSearchBarVisibility", "collapse")
        }
        else if (msg == "Error: java.net.ConnectException: Connection refused" || msg == "Error: java.net.ConnectException: Connection timed out" || msg == "Error: java.net.NoRouteToHostException: No route to host") {
          viewModel.set("no_internet1", "visible")
          viewModel.set("openTicketsSearchBarVisibility", "collapse")
        }
        else{
          viewModel.set("serverdown1", "visible")
          viewModel.set("openTicketsSearchBarVisibility", "collapse")
        }
        viewModel.set("openTickets_isLoading", false)
      }
    ).catch(
      function(error){
        console.log("error: " + error)
        if (error == "no_data") {
          viewModel.set("no_data1", "visible")
          viewModel.set("openTicketsSearchBarVisibility", "collapse")
        }
        else {
          viewModel.set("serverdown1", "visible")
          viewModel.set("openTicketsSearchBarVisibility", "collapse")
        }
        viewModel.set("openTickets_isLoading", false)
        return Promise.reject();
      }

    );
                                         
} 


//method for loading closed tickets
viewModel.loadClosedTickets = function(args){ 
 
  myTicketsClosedViewModel.empty();  // <--- none of use
  myTicketsClosedViewModel.loadClosedTickets().then(
      function(msg){
        if(msg == "success"){
          console.log("msg: " + msg)
          viewModel.set("studentMyTicketsClosedList", myTicketsClosedViewModel)
          
          //console.log("under loadTicketsFeedback().then : " + myTicketsClosedViewModel)
          viewModel.set("closedTickets_isLoading", false)
          viewModel.set("closedTicketsSearchBarVisibility", "visible")
          viewModel.set("data2", "visible")
          
          
        }
        else if (msg == "no_data") {
          viewModel.set("no_data2", "visible")
        }
        else if (msg == "Error: java.net.ConnectException: Connection refused" || msg == "Error: java.net.ConnectException: Connection timed out" || msg == "Error: java.net.NoRouteToHostException: No route to host") {
          viewModel.set("no_internet2", "visible")
        }
        else{
          viewModel.set("serverdown2", "visible")
          viewModel.set("closedTicketsSearchBarVisibility", "collapse")
        }
      }
    ).catch(
      function(error){
        console.log("error: " + error)
        if (error == "no_data") {
          viewModel.set("no_data2", "visible")
        }
        else {
          viewModel.set("serverdown2", "visible")
        }
        viewModel.set("closedTickets_isLoading", false)
        return Promise.reject();
      }

    );
                                         
}


////////////////////////////////////////  VISIBILITIES OF TICKETS PROPERTIES  ////////////////////////////////////////


 // //  Visibility Open Tickets
  viewModel.set("openTickets_isLoading", true)
  viewModel.set("no_data1", "collapse")
  viewModel.set("no_internet1", "collapse")
  viewModel.set("serverdown1", "collapse")
  viewModel.set("data1", "collapse")

  // Visibility Closed Tickets
  viewModel.set("closedTickets_isLoading", true)
  viewModel.set("no_data2", "collapse")
  viewModel.set("no_internet2", "collapse")
  viewModel.set("serverdown2", "collapse")
  viewModel.set("data2", "collapse")

  // Visibility feedback Tickets
  viewModel.set("feedbackTickets_isLoading", true)
  viewModel.set("no_data3", "collapse")
  viewModel.set("no_internet3", "collapse")
  viewModel.set("serverdown3", "collapse")
  viewModel.set("data3", "collapse")






return viewModel;

}
//exports.MyTicketsViewModel = MyTicketsViewModel;


