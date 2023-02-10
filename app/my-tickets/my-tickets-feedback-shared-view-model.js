var config = require("../../shared/config");
var http = require("http");
var ObservableArray = require("data/observable-array").ObservableArray;
var Observable = require("data/observable").Observable;

var appSettings = require("application-settings");
var moment = require("moment")
var apiProvider = require("../../common/api-provider");


function MyTicketsClosedViewModel(){
    var myTicketsClosedViewModel = new ObservableArray();
    
    //console.log("myTicketsViewModel in shared view model ")
    
    
    //myTicketsViewModel.empty(); //  empty method not working from here
    

        // method for closed tickets
        myTicketsClosedViewModel.loadClosedTickets = function(){

            var url = "https://my-json-server.typicode.com/SiddiquiUbaid/ngasce-mock-api/closedTickets"
        
            const RequestData = {
                url:   url,
                
            }

                return apiProvider.apiProviderGet(RequestData).then(function (response) {

                var statusCode = response.statusCode;
                console.log(statusCode)

                var content = response.content;
                content =  JSON.parse(content);
               
                // clear array before pushing new data
                myTicketsClosedViewModel.empty();
                for(var  i = 0; i < content.length; i++){

                    myTicketsClosedViewModel.push({
                        subject: content[i].subject,
                        ticketNo: content[i].ticketNo,
                        openDate: content[i].openDate,
                        statusColor: "#d2232a",
                        requestStatus: content[i].requestStatus,
                        closeDate: content[i].closeDate
                        
                        })            
                        
                }
                // for(var  i = 0; i < myTicketsClosedViewModel.length; i++){
                //     console.log("content[" + i + "]" + "of outer myTicketsViewModel: " + myTicketsViewModel.getItem(i).ticketNo)
                        
                // }
                 return("success") 

        }).catch(function(error){
            return error
            
        })
            
        }



        

        // function to empty the existing data
        myTicketsClosedViewModel.empty = function(){
            while (myTicketsClosedViewModel.length){
                myTicketsClosedViewModel.pop();
            }
        }

        
        return myTicketsClosedViewModel;
    }
module.exports = MyTicketsClosedViewModel;
