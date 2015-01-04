var error = false,
URLs = "",
score = 0,
sort = ["day", "week", "month", "year" , "all"],
locked = 0,
AntiSpam = false,
infinite = true,
infinitedubs = 0,
clientId = "76e0353dbfd399a";

setInterval(function() {
    if (score > 0) {
        score--;
    }
}, 5000);

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function checkImage() {
    if (img.height <= 81) {
        text = makeid();
        img = new Image();
        img.onload = function(){checkImage();};
        img.src = "https://i.imgur.com/" + text + ".jpg";
    } else {
        iURL = img.src;
        itype = "random";
        prepareImage();
    }
}

function httpGet(URL) {
    $.ajax({
    type: "GET",
    url: URL,
    headers: {"Authorization": authorization},
    success: function(a){
        var b = a.data;
        if (b !== undefined){
            C = b[Math.floor(Math.random() * b.length)];
            title = C.title;
            album = C.is_album;
            prepareImage();
        } 
        }
    });
}

var preimageregex = /ima*ge*\s*\/r\/(\w+)/ig;
var imageregex = /\/r\/(\w+)/i;
var galleryregex = /#gal+ery(?!\w)/ig;
var memesregex = /#(me|may){2,}s*(?!\w)/ig;
var hashtagregex = /# ?(\w)+/gi;
var truehashtagregex = /(\w)+/gi;
var bestregexlel = /#best(?!\w)/ig;
var randomregex = /#random(?!\w)/ig;

var idregex = /{"id":"(\w{5}|\w{7})"/g;
var idregex2 = /"(\w{5}|\w{7})"/g;

var urlregex = /https*:\/\/(\w|\.|\/|-)+\.(gif|jpg|jpeg)/gi;

var authorization = 'Client-ID ' + clientId;

// Checkem

function checkem() {
    if (infinitedubs === 0){
    var text = "";
    var possible = "123456789";
    
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    possible = possible + "0";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        
    return text;
    } else if (infinitedubs == 1){
        var text = "";
        var possible = "123456789";
        var dubscombo = ["00","11","22","33","44","55","66","77","88","99"];
        
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        possible = possible + "0";
        
        for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        text += dubscombo[Math.floor(Math.random()*dubscombo.length)];
        return text;
    } else {
        var sexscombo = ["111111","222222","333333","444444","555555","666666","777777","888888","999999"];
        text = sexscombo[Math.floor(Math.random()*sexscombo.length)];
        return text;
    }
}

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

var checkemregex = /([A-Za-z]{1,3}(ec(h|k)|ek|oll)|(bowl|rawl))+ *(ing|(\w)*em|in|this|dese|de+ze*)+(?! *((\w)+)|\.)/ig;

var dubsregex = /(\d)\1$/g;
var tripsregex = /(\d)\1\1$/g;
var quadsregex = /(\d)\1\1\1$/g;
var quintsregex = /(\d)\1\1\1\1$/g;
var sexregex = /(\d)\1\1\1\1\1$/g;

dubs = false;

function processString() {
    dubs = false;
    if (checkthis.search(sexregex) > -1){
        text = checkthis.insert(0,"#CC00FF");
        dubs = true;
    } else if (checkthis.search(quintsregex) > -1){
        text = checkthis.insert(1,"#FF0000");
        dubs = true;
    } else if (checkthis.search(quadsregex) > -1){
        text = checkthis.insert(2,"#00FF15");
        dubs = true;
    } else if (checkthis.search(tripsregex) > -1){
        text = checkthis.insert(3,"#00E1FF");
        dubs = true;
    } else if (checkthis.search(dubsregex) > -1){
        text = checkthis.insert(4,"#FFE100");
        dubs = true;
    } else {
        text = checkthis;
    }
    prepareImage();
}

// Google News

$('head').append('<script src="https://www.google.com/jsapi"></script>');

function guugle(){google.load('feeds', 1, {
        callback: function() {} //intentionally left blank
    } );
    console.log("Google Feeds API and SpooksBot have succesfully loaded :)");
}

setTimeout(function(){guugle();}, 1500);

var feedlimit = 10;

function runfunction(result){
    mayme = result.feed.entries;
    newsarray = mayme;
    newsresult = newsarray[Math.floor(Math.random() * newsarray.length)];
    title = newsresult.title;
    prelink = newsresult.link;
    link1 = prelink.match(boxregex);
    link2 = stringify(link1).match(finalboxregex);
    link = link2[0];
    prepareImage();
}

function loadit(){ 
    feed.load(runfunction);
}

var newsURL = "http://news.google.com/?output=rss";
var boxregex = /&url=(https*:\/\/(.)+)/gi;
var finalboxregex = /(https*:\/\/(.)+)/gi;

// Main Function

function main() {
    
    str = $('#messages').children().slice(-1)[0].outerHTML;

    a = str.search(hashtagregex);
    b = str.search(preimageregex);
    c = str.search(randomregex);
    d = str.search(galleryregex);
    g = str.search(memesregex);
    l = str.search(bestregexlel);
    m = str.indexOf("#news");
    n = str.search(checkemregex);
    p = str.indexOf("107001000");
    q = str.indexOf("-000");
    r = str.indexOf("personal-message");
    
    if (r == -1){
    if (n > -1) {
        itype = "checkem";
        checkthis = checkem();
        processString();
    } else if (b > -1) {
        hawaii = str.match(imageregex);
            $.ajax({
            type: "GET",
            url: "https://api.imgur.com/3/gallery" + hawaii[0],
            headers: {"Authorization": authorization},
            success: function(a){
            var b = a.data;
            if (b !== undefined){
            C = b[Math.floor(Math.random() * b.length)];
            CLIENT.submit("https://i.imgur.com/" + C.id + ".jpg" + "\n" + C.title);
            } 
            }
            });
            AntiSpam = true;
            setTimeout(function(){AntiSpam=false;}, 600);
            score++;
    } else if (p > -1 && q > -1) {
                if (infinite){
        if (infinitedubs == 0){
        infinitedubs = 1;
        CLIENT.submit("Infinite Dubs mode unlocked");
        score++;
        AntiSpam = true;
        setTimeout(function(){AntiSpam=false;}, 600);
        } else if (infinitedubs == 1){
            infinitedubs = 2;
            CLIENT.submit("??????");
            score++;
            AntiSpam = true;
            setTimeout(function(){AntiSpam=false;}, 600);
        } else if (infinitedubs == 2){
            infinitedubs = 0;
            CLIENT.submit("Cheats Disabled");
            score++;
        AntiSpam = true;
        setTimeout(function(){AntiSpam=false;}, 600);
        }
        } else {
            console.log("disabled");
        }
    } else if (a > -1) {
        if (d > -1) {
                $.ajax({
                type: "GET",
                url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
                headers: {"Authorization": authorization},
                success: function(a){
                var b = a.data;
                if (b !== undefined){
                C = b[Math.floor(Math.random() * b.length)];
                title = C.title;
                    if (!C.is_album){
                    id = C.id;
                    CLIENT.submit("https://i.imgur.com/" + id + ".jpg" + "\n" + title);
                    } else {
                    id = C.cover;
                    albumlink = C.link;
                    CLIENT.submit("https://i.imgur.com/" + id + ".jpg" + "\n" + title + "\n" + "See more at " + albumlink);
                    }
                } 
                }
                });
        } else if (c > -1) {
            id = makeid();
            img = new Image();
            img.onload = function(){checkImage();};
            img.src = "https://i.imgur.com/" + id + ".jpg";
        } else if (g > -1) {
                $.ajax({
                type: "GET",
                url: "https://api.imgur.com/3/g/memes",
                headers: {"Authorization": authorization},
                success: function(a){
                var b = a.data;
                if (b !== undefined){
                C = b[Math.floor(Math.random() * b.length)];
                title = C.title;
                            if (!C.is_album){
                    id = C.id;
                    CLIENT.submit("https://i.imgur.com/" + id + ".jpg" + "\n" + title);
                } else {
                    id = C.cover;
                    albumlink = C.link;
                    CLIENT.submit("https://i.imgur.com/" + id + ".jpg" + "\n" + title + "\n" + "See more at " + albumlink);
                }
                } 
                }
                });
                AntiSpam = true;
                setTimeout(function(){AntiSpam=false;}, 600);
                score++;
        } else if (l > -1) {
            itype = "best";
            sortresult = sort[Math.floor(Math.random() * sort.length)];
            URLs = "https://api.imgur.com/3/gallery/top/" + sortresult;
            httpGet(URLs);
        } else if (m > -1) {
            itype = "news";
            feed = new google.feeds.Feed(newsURL);
            feed.setNumEntries(feedlimit);
            loadit();
        } else {
            alaska = str.match(hashtagregex);
            canada = alaska[alaska.length - 1];
            if (str.lastIndexOf("color: ") + 7 < str.lastIndexOf(canada)) {
                subreddit = "/r/" + canada.match(truehashtagregex);
                    $.ajax({
                type: "GET",
                url: "https://api.imgur.com/3/gallery" + subreddit,
                headers: {"Authorization": authorization},
                success: function(a){
                    var b = a.data;
                    if (b !== undefined){
                        C = b[Math.floor(Math.random() * b.length)];
                        CLIENT.submit("https://i.imgur.com/" + C.id + ".jpg" + "\n" + C.title);
                        } 
                        }
                    });
                    AntiSpam = true;
                    setTimeout(function(){AntiSpam=false;}, 600);
                    score++;
            }
        }
    } 
    }
}

function prepareResponse() {
    if (error === true) {
        if (errortype == "null") {
            console.log("Null Error: You are referencing a nonexistent object.");
        }
        error = false;
    }
}

function stringify(strArray) {
    var tempstring = "";
    for (var j = 0; j < strArray.length; j++) {
        tempstring = tempstring + strArray[j];
    }
    return tempstring;
}

function prepareImage() {
    if (itype == "checkem"){
        if (dubs === false){
        CLIENT.submit(text);
        } else {
           superrandom = Math.floor(Math.random()*6);
           if (superrandom !== 5){
                CLIENT.submit(text + "\n" + "https://i.imgur.com/Xpb0MWj.png");
           } else {
                CLIENT.submit(text + "\n" + "https://i.imgur.com/CkdcWVU.gif");
           }
        }
    } else if (itype == "best"){
        if (!album){
            id = C.id;
            CLIENT.submit("https://i.imgur.com/" + id + ".jpg" + "\n" + title);
        } else {
            id = C.cover;
            albumlink = C.link;
            CLIENT.submit("https://i.imgur.com/" + id + ".jpg" + "\n" + title + "\n" + "See more at " + albumlink);
        }
    } else if (itype == "news"){
        CLIENT.submit(title + "\n" + link);
    } else if (itype == "random"){
        if (score < 5){
        CLIENT.submit(iURL);
        }
    }
    AntiSpam = true;
    setTimeout(function(){AntiSpam=false;}, 600);
    score++;
}

$(function() {
    var socket = io('/' + window.channel);
    socket.on('message', function() {
      if (AntiSpam === false){
        if (score < 5) {
                main();
        } else if (score == 5){
        CLIENT.submit("#redPlease wait 6 seconds before sending again");
        AntiSpam = true;
        setTimeout(function(){AntiSpam=false;}, 600);
        }}
    });
});

$.ajax({
    type: "GET",
    url: "https://api.imgur.com/3/credits",
    headers: {"Authorization": authorization},
    success: function(a){
        remaining = a.data.ClientRemaining;
    }
});
