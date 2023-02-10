var config = require("../../shared/config");
var http = require("http");
var ObservableArray = require("data/observable-array").ObservableArray;
var Observable = require("data/observable").Observable;

var appSettings = require("application-settings");
var moment = require("moment")
var apiProvider = require("../../common/api-provider");


function MyTicketsOpenViewModel(){
    var myTicketsOpenViewModel = new ObservableArray();
    
   // console.log("myTicketsOpenViewModel in shared view model " )
    
    
    //myTicketsViewModel.empty(); //  empty method not working from here
    
    myTicketsOpenViewModel.loadOpenTickets = function(){

            var url = "https://my-json-server.typicode.com/SiddiquiUbaid/ngasce-mock-api/openTickets"
        
            const RequestData = {
                url:   url,
                
            }

                return apiProvider.apiProviderGet(RequestData).then(function (response) {

                var statusCode = response.statusCode;
                console.log(statusCode)

                var content = response.content;
                content =  JSON.parse(content);
               
                // clear array before pushing new data
                myTicketsOpenViewModel.empty();
                for(var  i = 0; i < content.length; i++){

                    myTicketsOpenViewModel.push({
                        subject: content[i].subject,
                        ticketNo: content[i].ticketNo,
                        openDate: content[i].openDate,
                        statusColor: "#d2232a",
                        requestStatus: content[i].requestStatus,
                        inProgressDate: content[i].inProgressDate,
                        expectedCloseDate: content[i].expectedCloseDate,
                        isEscalate: content[i].isEscalate,
                        })            
                        
                }
                // for(var  i = 0; i < myTicketsOpenViewModel.length; i++){
                //     console.log("content[" + i + "]" + "of outer myTicketsOpenViewModel: " + myTicketsViewModel.getItem(i).subject)
                        
                // }


                 return("success") 

        }).catch(function(error){
            return error
            
        })
            
        }


        // function to empty the existing data
        myTicketsOpenViewModel.empty = function(){
            while (myTicketsOpenViewModel.length){
                myTicketsOpenViewModel.pop();
            }
        }

        
        return myTicketsOpenViewModel;
    }
module.exports = MyTicketsOpenViewModel;
