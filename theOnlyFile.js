var URLs = "",
    score = 0,
    sort = ["day", "week", "month", "year", "all"],
    AntiSpam = false;

authorization = 'Client-ID 76e0353dbfd399a';

$(function() {
    io('/' + window.channel).on('message', function(data) {
        if (AntiSpam === false && score <= 10) main(data);
    });
});

setInterval(function() {
    score = 0;
}, 60000);

function httpGet(URL) {
    $.ajax({
        type: "GET",
        url: URL,
        headers: {
            "Authorization": authorization
        },
        success: function(a) {
            var b = a.data;
            if (b !== undefined) {
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
var memesregex = /im\/memes*/ig;
var hashtagregex = /ir\/ ?(\w)+/gi;
var truehashtagregex = /(\w)+/gi;
var bestregexlel = /ii\/best(?!\w)/ig;

var idregex = /{"id":"(\w{5}|\w{7})"/g;
var idregex2 = /"(\w{5}|\w{7})"/g;

var urlregex = /https*:\/\/(\w|\.|\/|-)+\.(gif|jpg|jpeg)/gi;

// Checkem

function checkem() {
    var datapool = "3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827";

    text = datapool.charAt(Math.floor(Math.random() * datapool.length));

    while (text.indexOf("0") != -1)
        text = datapool.charAt(Math.floor(Math.random() * datapool.length));


    for (var i = 0; i < 8; i++)
        text += datapool.charAt(Math.floor(Math.random() * datapool.length));
    return text;
}

String.prototype.insert = function(index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

var checkemregex = /(((?!chem)chec?k?e?m)|chemk|cehkm|(czech|ital(ian|y)|germany?|pol(ish|and)|spa(nish|in)|welsh|brazil(ian)?|russian?|dutch|british( ?commonwealth)?) ?em|new post|gimme (numbers|4chan)|rolling?|rollem)/ig;

var dubsregex = /(\d)\1$/g;
var tripsregex = /(\d)\1\1$/g;
var quadsregex = /(\d)\1\1\1$/g;
var quintsregex = /(\d)\1\1\1\1$/g;
var sexregex = /(\d)\1\1\1\1\1$/g;
var septregex = /(\d)\1\1\1\1\1\1$/g;
var octoregex = /(\d)\1\1\1\1\1\1\1$/g;
var nonoregex = /(\d)\1\1\1\1\1\1\1\1$/g;

function processString() {
if (checkthis.search(nonoregex) > -1) {
        text = checkthis.insert(0, "#CC00FF");
} else if (checkthis.search(octoregex) > -1) {
        text = checkthis.insert(1, "#CC00FF");
} else if (checkthis.search(septregex) > -1) {
        text = checkthis.insert(2, "#CC00FF");
    } else if (checkthis.search(sexregex) > -1) {
        text = checkthis.insert(3, "#CC00FF");
    } else if (checkthis.search(quintsregex) > -1) {
        text = checkthis.insert(4, "#FF0000");
    } else if (checkthis.search(quadsregex) > -1) {
        text = checkthis.insert(5, "#00FF15");
    } else if (checkthis.search(tripsregex) > -1) {
        text = checkthis.insert(6, "#00E1FF");
    } else if (checkthis.search(dubsregex) > -1) {
        text = checkthis.insert(7, "#FFE100");
    } else {
        text = checkthis;
    }
    prepareImage();
}

// Google News

$('head').append('<script src="https://www.google.com/jsapi"></script>');

function guugle() {
    google.load('feeds', 1, {
        callback: function() {} //intentionally left blank
    });
    console.log("Google Feeds API and SpooksBot have succesfully loaded :)");
}

setTimeout(function() {
    guugle();
}, 1500);

var feedlimit = 10;

function runfunction(result) {
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

function loadit() {
    feed.load(runfunction);
}

var newsURL = "http://news.google.com/?output=rss";
var boxregex = /&url=(https*:\/\/(.)+)/gi;
var finalboxregex = /(https*:\/\/(.)+)/gi;

// Main Function

function main(data) {

    str = data.message;
    a = str.search(hashtagregex);
    b = str.search(preimageregex);
    d = str.search("im/gallery");
    g = str.search(memesregex);
    l = str.search(bestregexlel);
    m = str.indexOf("in/news");
    n = str.search(checkemregex);

    if (data.type === "chat-message") {
        console.log("it worked");
        console.log(str);
        if (n > -1) {
            itype = "checkem";
            checkthis = checkem();
            processString();
        } else if (b > -1) {
            hawaii = str.match(imageregex);
            $.ajax({
                type: "GET",
                url: "https://api.imgur.com/3/gallery" + hawaii[0],
                headers: {
                    "Authorization": authorization
                },
                success: function(a) {
                    var b = a.data;
                    if (b !== undefined) {
                        C = b[Math.floor(Math.random() * b.length)];
                        CLIENT.submit("https://i.imgur.com/" + C.id + ".jpg" + "\n" + C.title);
                    }
                }
            });
            AntiSpam = true;
            setTimeout(function() {
                AntiSpam = false;
            }, 600);
            score++;
        } else if (a > -1) {
            alaska = str.match(hashtagregex);
            subreddit = "/r/" + alaska[0].match(truehashtagregex)[1];
            $.ajax({
                type: "GET",
                url: "https://api.imgur.com/3/gallery" + subreddit,
                headers: {
                    "Authorization": authorization
                },
                success: function(a) {
                    var b = a.data;
                    if (b !== undefined) {
                        C = b[Math.floor(Math.random() * b.length)];
                        CLIENT.submit("https://i.imgur.com/" + C.id + ".jpg" + "\n" + C.title);
                    }
                }
            });
            AntiSpam = true;
            setTimeout(function() {
                AntiSpam = false;
            }, 600);
            score++;

        } else if (d > -1) {
            $.ajax({
                type: "GET",
                url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
                headers: {
                    "Authorization": authorization
                },
                success: function(a) {
                    var b = a.data;
                    if (b !== undefined) {
                        C = b[Math.floor(Math.random() * b.length)];
                        title = C.title;
                        if (!C.is_album) {
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
        } else if (g > -1) {
            $.ajax({
                type: "GET",
                url: "https://api.imgur.com/3/g/memes",
                headers: {
                    "Authorization": authorization
                },
                success: function(a) {
                    var b = a.data;
                    if (b !== undefined) {
                        C = b[Math.floor(Math.random() * b.length)];
                        title = C.title;
                        if (!C.is_album) {
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
            setTimeout(function() {
                AntiSpam = false;
            }, 600);
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
        }
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
    if (itype == "checkem") {
            CLIENT.submit(text);
    } else if (itype == "best") {
        if (!album) {
            id = C.id;
            CLIENT.submit("https://i.imgur.com/" + id + ".jpg" + "\n" + title);
        } else {
            id = C.cover;
            albumlink = C.link;
            CLIENT.submit("https://i.imgur.com/" + id + ".jpg" + "\n" + title + "\n" + "See more at " + albumlink);
        }
    } else if (itype == "news") {
        CLIENT.submit(title + "\n" + link);
    } else if (itype == "random") {
        if (score < 5) {
            CLIENT.submit(iURL);
        }
    }
    AntiSpam = true;
    setTimeout(function() {
        AntiSpam = false;
    }, 600);
    score++;
}

$.ajax({
    type: "GET",
    url: "https://api.imgur.com/3/credits",
    headers: {
        "Authorization": authorization
    },
    success: function(a) {
        remaining = a.data.ClientRemaining;
    }
});
