if(window.location.pathname == '/'){
  $('table table tbody tr:nth-child(n+45)').
    css('display','none')

  $('table table:nth-child(2)').
    append('<a id="moar" href="">More</a>')

  $('#moar').
    click(function(){
      $('table table:nth-child(1) tr').css('display','table-row')
      $(this).hide()
      return false;
    }).
    css('padding', '25px')
}

// single item page
if (window.location.pathname === "/item") {
  var $wrapper      = $("center table:first");
  var $header       = $wrapper.find("tr:eq(0) td");
  var $submission   = $wrapper.find("tr:eq(3) table:eq(0)").find("tr:eq(3) td:last");
  var $commentTable = $wrapper.find("tr:eq(3) table:eq(1)");
  var $comments     = $commentTable.find("> tbody > tr");

  // linkify submission text links
  $submission.html($submission.html().replace(/(https?:\/\/.*?)[\s|<]/g, function() {
    var terminator = arguments[0].charAt(arguments[0].length - 1);
    var url        = arguments[1];

    // I can't get the regex above to match a "." at the end of a url, but not inside the url
    // so here is a cheap hack to work around my incompetency
    if (url.match(/\.$/)) {
      url        = url.replace(/\.$/, "");
      terminator = "." + terminator;
    }
    return "<a href='" +url + "' target='_blank'>" + url + "</a>" + terminator;
  }));

  // comment thread folding
  $comments.filter(":has(td img[width=0])").addClass("root");
  $comments.addClass("comment").each(function() {
    $(this).find(".comhead").append(" <a href='javascript:void(0);' class='fold'>[-]</a>");
  });

  $("a.fold").toggle(function() {
    $(this)
      .closest("tr.comment")
        .nextUntil("tr.root")
        .hide()
      .end()
    .end().html("[+]");
  }, function() {
    $(this)
      .closest("tr.comment")
        .nextUntil(".root")
        .show()
      .end()
    .end().html("[-]");
  });
}