/* #6 start the #external #action and say hello */
console.log("App is alive");

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */

var channels = [
    yummy,
    sevencontinents,
    killerapp,
    firstpersononmars,
    octoberfest
];

var currentChannel;


currentChannel = sevencontinents;

console.log(currentChannel);


var currentLocation = {
  latitude: 48.14883,
  longitude: 11.56713,
  what3words: "irgendwo.lippe.scheint"
}

function switchChannel(channelObject) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelObject.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="https://w3w.co/'
        + channelObject.createdBy
        + '" target="_blank"><strong>'
        + channelObject.createdBy
        + '</strong></a>';

        
    $('#chat h1 i').removeClass('far fas');
    $('#chat h1 i').addClass(channelObject.starred ? 'fas' : 'far');


    /* highlight selected channel*/
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelObject.name + ')').addClass('selected');

    currentChannel = channelObject;

}

/* #6 #liking a channel on #click */
function star() {
    $('#chat i').toggleClass('fas');
    $('#chat i').toggleClass('far');
    

   currentChannel.starred = !currentChannel.starred;

    $('#channels li:contains(' + currentChannel.name + ') .fa').removeClass('fas far');
    $('#channels li:contains(' + currentChannel.name + ') .fa').addClass(currentChannel.starred ? 'fas' : 'far');

}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

//constructor 
function Message(text) {
    // copy my location
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date();
    this.expiresOn = new Date(Date.now() + 15 * 60 * 1000); 
    this.text = text;
    this.own = true;
    
}
    

function sendMessage() {


    //message from input field
    var message = new Message($('#message').val());
      console.log("New message:", message);



    //adding to message div
    $('#messages').append(createMessageElement(message));
    $('#message').scrollTop($('#messages').prop('scrollHeight')); 
    //clear input
    $('#message').val(''); 
}

function createMessageElement(messageObject) {

    var expiresIn = Math.round((messageObject.expiresOn - Date.now()) / 1000 / 60);

    return '<div class="message'+(messageObject.own ? ' own' : '')+ '">' + 

    '<h3><a href="http://w3w.co/' + messageObject.createdBy + 
    '"target="_blank">' +
    '<strong>'+ messageObject.createdBy + 
    '</strong></a>' + messageObject.createdOn.toLocaleString() +
    '<em>' + expiresIn + ' min. left</em></h3>' +
    '<p>' + messageObject.text + '</p>' + 
    '<button>+5 min. </button>' + 
    '<div>'



}

function listChannels() {
    

    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevencontinents));
    $('#channels ul').append(createChannelElement(killerapp));
    $('#channels ul').append(createChannelElement(firstpersononmars));
    $('#channels ul').append(createChannelElement(octoberfest));


}

function createChannelElement(channelObject) {
    
    // create channel
    var channel = $('<li>').text(channelObject.name);

    $(channel).click(function () {
        switchChannel(channelObject, this);
    });


    // create and append channel meta
    var meta = $('<span>').addClass('channel-meta').appendTo(channel);

    $('<i>').addClass('fa-star').addClass(channelObject.starred ? 'fas' : 'far').appendTo(meta);

    // arrow
    $('<i>').addClass('fas').addClass('fa-chevron-right').appendTo(meta);


    // return the complete channel
    return channel;
}

