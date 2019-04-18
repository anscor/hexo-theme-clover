! function () {
    var n = document.querySelector.bind(document);
    var toc = n('.post-toc');
    var mark = false;
    if (toc) {
        if (toc.children.length)
            mark = true;
    }

    offset = function (el) {
        var x = el.offsetLeft,
            y = el.offsetTop;

        if (el.offsetParent) {
            var pOfs = arguments.callee(el.offsetParent);
            x += pOfs.x;
            y += pOfs.y;
        }

        return {
            x: x,
            y: y
        };
    }

    var titles = n('.content').querySelectorAll('h1, h2, h3, h4, h5, h6');
    toc.querySelector('a[href="#' + titles[0].id + '"]').parentNode.classList.add('active');
    var tocChilds = toc.querySelectorAll('.post-toc-child');
    for (i = 0, len = tocChilds.length; i < len; i++) {
        tocChilds[i].classList.add('post-toc-shrink');
    }
    var firstChild = toc.querySelector('a[href="#' + titles[0].id + '"]').nextElementSibling;
    if (firstChild) {
        firstChild.classList.add('post-toc-expand');
        firstChild.classList.remove('post-toc-shrink');
    }
    toc.classList.remove('post-toc-shrink');

    var handleTocActive = function (prevEle, currEle) {
        prevEle.classList.remove('active');
        currEle.classList.add('active');

        var siblingChilds = currEle.parentElement.querySelectorAll('.post-toc-child');
        for (j = 0, len1 = siblingChilds.length; j < len1; j++) {
            siblingChilds[j].classList.remove('post-toc-expand');
            siblingChilds[j].classList.add('post-toc-shrink');
        }
        var myChild = currEle.querySelector('.post-toc-child');
        if (myChild) {
            myChild.classList.remove('post-toc-shrink');
            myChild.classList.add('post-toc-expand');
        }
    };

    var actived = function (top) {
        for (i = 0, len = titles.length; i < len; i++) {
            if (top > offset(titles[i]).y - 40) {
                var prevListEle = toc.querySelector('li.active');
                var currListEle = toc.querySelector('a[href="#' + titles[i].id + '"]').parentNode;

                handleTocActive(prevListEle, currListEle);
            }
        }

        if (top < offset(titles[0]).y) {
            handleTocActive(
                toc.querySelector('li.active'),
                toc.querySelector('a[href="#' + titles[0].id + '"]').parentNode
            );
        }
    }

    var appeared = function (left) {
        var nav = n('#toc-nav');
        if (left < nav.offsetLeft + nav.clientWidth + 10) nav.style.display = 'none';
        else nav.style.display = 'inline-block';
    }

    window.addEventListener('scroll', function () {
        if ($('#main').offset().top - 40 <= document.documentElement.scrollTop) {
            $('#toc-nav').css('top', 40);
            $('#toc-nav').css('position', 'fixed');
        } else {
            $('#toc-nav').css('top', $('.article').offset().top);
            $('#toc-nav').css('position', 'absolute');
        }
        actived(document.documentElement.scrollTop | document.body.scrollTop);
        appeared(document.documentElement.scrollWidth | document.body.scrollWidth);
    });

    document.addEventListener('ready', function () {
        actived(document.documentElement.scrollTop | document.body.scrollTop);
        appeared(document.documentElement.scrollWidth | document.body.scrollWidth);
    });

    window.addEventListener('resize', function () {
        appeared(document.documentElement.scrollWidth | document.body.scrollWidth);
    });


}();