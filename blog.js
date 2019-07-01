"use strict";
(function(){
    var blogPosts = [{
        id: 1,
        title: "My first blog post",
        body: "Galleon crimp starboard gaff hempen halter hardtack jury mast chandler spirits gabion. Execution dock starboard spanker Buccaneer crimp man-of-war no prey, no pay salmagundi Spanish Main bowsprit. Tender hail-shot gangplank main sheet pressgang rigging matey flogging bilged on her anchor gally.\n" +
            "\n" +
            "Maroon interloper gibbet bucko tender swab aye ballast log brig. Avast Blimey poop deck fire ship red ensign quarterdeck quarter Corsair tackle walk the plank. Jack Ketch Plate Fleet crimp measured fer yer chains starboard snow jib Admiral of the Black square-rigged black spot.\n" +
            "\n" +
            "Sutler avast barkadeer league bucko list take a caulk lad lanyard spike. Strike colors dance the hempen jig spyglass Spanish Main hornswaggle wherry take a caulk booty provost swab. Corsair gabion case shot pirate Plate Fleet log dance the hempen jig squiffy hardtack jack.",
        categories: [
            "funny", "heart-warming", "pirate", "privateering"
        ],
        author: {
            firstName: "David",
            lastName: "Stephens"
        }
    }];

    function buildHTML(arr) {
        var finalHtml = "";
        arr.forEach(function(element) {
            finalHtml += "<div><h2>" + element.title + "</h2>";
            finalHtml += "<h4>By " + element.author.firstName + " " + element.author.lastName +"</h4>";
            finalHtml += "<p>" + element.body + "</p>";
            finalHtml += "<p class='categories'>";
            element.categories.forEach(function(category, i, arr){
                if (i === (arr.length - 1)) {
                    finalHtml += category;
                } else {
                    finalHtml += category + ", ";
                }
            });
            finalHtml += "</p></div>";
        });
        document.getElementById("blog-posts").innerHTML = finalHtml;
    }

    function clearHTML() {
        document.getElementById("blog-posts").innerHTML = "";
    }

    function makeNewBlogPost(e) {
        e.preventDefault();
        var first = document.getElementById("firstName").value;
        var last = document.getElementById("lastName").value;
        var title = document.getElementById("title").value;
        var body = document.getElementById("body").value;
        var cat1 = document.getElementById("cat1").value;
        var cat2 = document.getElementById("cat2").value;
        var cat3 = document.getElementById("cat3").value;

        var blogPost = {
            id: blogPosts.length + 1,
            title: title,
            body: body,
            author: {
                firstName: first,
                lastName: last
            },
            categories: [cat1, cat2, cat3]
        };
        blogPosts.unshift(blogPost);
        buildHTML(blogPosts);
    }

    function search(e) {
        e.preventDefault();
        var query = document.getElementById("query").value.toLowerCase();
        var arr = [];
        blogPosts.forEach(function(post) {
            var arrLength = arr.length;
            if (post.title.toLowerCase().includes(query) || post.author.firstName.toLowerCase().includes(query) || post.author.lastName.toLowerCase().includes(query)) {
                arr.push(post);
            }
            if (arrLength === arr.length) {
                post.categories.forEach(function (category) {
                    if (category.toLowerCase().includes(query)) {
                        if (arrLength === arr.length) {
                            arr.push(post);
                        }
                    }
                })
            }
        });
        buildHTML(arr);
    }

    document.getElementById("submitNew").addEventListener("click", makeNewBlogPost);
    document.getElementById("query").addEventListener("keyup", search);
    document.getElementById("submitQuery").addEventListener("click", search);

    buildHTML(blogPosts);

})();