
(function(){
  var opts={"version":1,"apiEndpoint":"https://api.trello.com","authEndpoint":"https://trello.com","intentEndpoint":"https://trello.com","key":"3a8f7dfb3a01817cfd6b2aadc4de276d"};
  var deferred,isFunction,isReady,ready,waitUntil,wrapper,slice=[].slice;
  wrapper=function(b,f,a){var h,e,p,x,z,m,A,q,k,s,t,r,B,y,u,g,v,w;k=a.key;g=a.token;e=a.apiEndpoint;p=a.authEndpoint;A=a.intentEndpoint;v=a.version;z=e+"/"+v+"/";r=b.location;h={version:function(){return v},key:function(){return k},setKey:function(c){k=c},token:function(){return g},setToken:function(c){g=c},rest:function(){var c,b,n,d;b=arguments[0];c=2<=arguments.length?slice.call(arguments,1):[];d=B(c);n=d[0];c=d[1];a={url:""+z+n,type:b,data:{},dataType:"json",success:d[2],error:d[3]};k&&(a.data.key=
    k);g&&(a.data.token=g);null!=c&&f.extend(a.data,c);return f.ajax(a)},authorized:function(){return null!=g},deauthorize:function(){g=null;w("token",g)},authorize:function(c){var l,n,d,e,k;a=f.extend(!0,{type:"redirect",persist:!0,interactive:!0,scope:{read:!0,write:!1,account:!1},expiration:"30days"},c);c=/[&#]?token=([0-9a-f]{64})/;n=function(){if(a.persist&&null!=g)return w("token",g)};a.persist&&null==g&&(g=y("token"));null==g&&(g=null!=(d=c.exec(r.hash))?d[1]:void 0);if(this.authorized())return n(),
    r.hash=r.hash.replace(c,""),"function"===typeof a.success?a.success():void 0;if(!a.interactive)return"function"===typeof a.error?a.error():void 0;e=function(){var b,c;b=a.scope;c=[];for(l in b)(k=b[l])&&c.push(l);return c}().join(",");switch(a.type){case "popup":(function(){var c,d,l,f,k,m;waitUntil("authorized",function(c){return function(c){return c?(n(),"function"===typeof a.success?a.success():void 0):"function"===typeof a.error?a.error():void 0}}(this));d=b.screenX+(b.innerWidth-420)/2;m=b.screenY+
    (b.innerHeight-470)/2;l=null!=(k=/^[a-z]+:\/\/[^\/]*/.exec(r))?k[0]:void 0;c=b.open(x({return_url:l,callback_method:"postMessage",scope:e,expiration:a.expiration,name:a.name}),"trello","width=420,height=470,left="+d+",top="+m);f=function(a){var d;a.origin===p&&a.source===c&&(null!=(d=a.source)&&d.close(),g=null!=a.data&&/[0-9a-f]{64}/.test(a.data)?a.data:null,"function"===typeof b.removeEventListener&&b.removeEventListener("message",f,!1),isReady("authorized",h.authorized()))};return"function"===
  typeof b.addEventListener?b.addEventListener("message",f,!1):void 0})();break;default:b.location=x({redirect_uri:r.href,callback_method:"fragment",scope:e,expiration:a.expiration,name:a.name})}},addCard:function(c,a){var n,d;n={mode:"popup",source:k||b.location.host};d=function(a){var d,l,e;l=function(c){var d;b.removeEventListener("message",l);try{return d=JSON.parse(c.data),d.success?a(null,d.card):a(Error(d.error))}catch(e){}};"function"===typeof b.addEventListener&&b.addEventListener("message",
    l,!1);d=b.screenX+(b.outerWidth-500)/2;e=b.screenY+(b.outerHeight-600)/2;return b.open(A+"/add-card?"+f.param(f.extend(n,c)),"trello","width=500,height=600,left="+d+",top="+e)};return null!=a?d(a):b.Promise?new Promise(function(c,a){return d(function(b,d){return b?a(b):c(d)})}):d(function(){})}};s=["GET","PUT","POST","DELETE"];e=function(c){return h[c.toLowerCase()]=function(){return this.rest.apply(this,[c].concat(slice.call(arguments)))}};m=0;for(q=s.length;m<q;m++)u=s[m],e(u);h.del=h["delete"];
    u="actions cards checklists boards lists members organizations lists".split(" ");m=function(c){return h[c]={get:function(a,b,d,e){return h.get(c+"/"+a,b,d,e)}}};q=0;for(s=u.length;q<s;q++)e=u[q],m(e);b.Trello=h;x=function(c){return p+"/"+v+"/authorize?"+f.param(f.extend({response_type:"token",key:k},c))};B=function(c){var a,b,d;b=c[0];a=c[1];d=c[2];c=c[3];isFunction(a)&&(c=d,d=a,a={});b=b.replace(/^\/*/,"");return[b,a,d,c]};t=b.localStorage;null!=t?(y=function(a){return t["trello_"+a]},w=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          b){if(null===b)return delete t["trello_"+a];try{return t["trello_"+a]=b}catch(e){}}):y=w=function(){}};deferred={};ready={};waitUntil=function(b,f){return null!=ready[b]?f(ready[b]):(null!=deferred[b]?deferred[b]:deferred[b]=[]).push(f)};isReady=function(b,f){var a,h,e,p;ready[b]=f;if(deferred[b])for(h=deferred[b],delete deferred[b],e=0,p=h.length;e<p;e++)a=h[e],a(f)};isFunction=function(b){return"function"===typeof b};wrapper(window,jQuery,opts);
})()

var authenticationSuccess = function() {
  console.log('Successful authentication');
};


var authenticationFailure = function() {
  console.log('Failed authentication');
};

var creationSuccess = function (data) {
  console.log("Board created successfully.");
  let copyPaste = $("<span style='display: block; margin:2px; float:left;'></span>").text("Copy and paste this link: ");
  let doneLink = $("<a></a>").attr('href', data.shortUrl).text(data.shortUrl);

  copyPaste.append(doneLink).insertAfter('#createList');

  Trello.post('/lists?name='+ $('#list_name').val() + '&idBoard=' + data.id, function(result){
    console.log("List created successfully.");

    $('.card_name').each(function(index){
      var newCard = {
        name: $(this).val(),
        desc: 'This is the description of ' + $(this).val() + ' card.',
        // Place this card at the top of our list
        idList: result.id,
        pos: 'top'
      };

      Trello.post('/cards/', newCard, function(data){
        console.log("Card '" + newCard.name  + "' created successfully.");
      });
    });
  });

  let postId = $('#post_1').attr("data-post-id");

  $.get('http://discussion.dataforyouand.me/posts/' + postId + '.json?api_key=b5a802f239160697786c69a642e70ddaa7eafb78446f8f6cbcc78b11a2ba8e34&api_username=eyvind', function(result){
    //if(err) console.log(err);
    
    let topic_id = result.topic_id;
    result.raw = 'Link to trello: ' + data.shortUrl + '\n' + result.raw;

    $.ajax({
      url: 'http://discussion.dataforyouand.me/posts/' + postId + '.json?api_key=b5a802f239160697786c69a642e70ddaa7eafb78446f8f6cbcc78b11a2ba8e34&api_username=eyvind',
      type: 'PUT',
      data: result,
      success: function(data) {
        $.get('http://discussion.dataforyouand.me/t/-/' + topic_id + '.json?api_key=b5a802f239160697786c69a642e70ddaa7eafb78446f8f6cbcc78b11a2ba8e34&api_username=eyvind', function(topic){
          //if(err) console.log(err);
          let params = {
            title: '[GRADUATED] ' + topic.title
          }
          
          $.ajax({
            url: 'http://discussion.dataforyouand.me/t/' + topic.slug + '/' + topic.id + '.json?api_key=b5a802f239160697786c69a642e70ddaa7eafb78446f8f6cbcc78b11a2ba8e34&api_username=eyvind',
            type: 'PUT',
            data: params,
            success: function(data) {
              console.log('please work');
              $.get('http://discussion.dataforyouand.me');
            }
          });
        });
      }
    });
  });
};

$(function(){
  $('input').attr('font-size', '10px;');
  $('#createList').click(function(){
    Trello.post('/boards?defaultLabels=false&defaultLists=false&name='+ $('#board_name').val() +'&prefs_permissionLevel=public', creationSuccess);
    // $('#listform').toggle();
    // $('.modal-backdrop').fadeOut();
  });

  $('#addmore').click(function(){
    $('<div class="form-group"><div class="input-group"><span class="input-group-addon"><i class="fa fa-border"></i></span><input type="text" style="padding: .8em;"  class="form-control card_name" placeholder="Task" name="card_name"/></div></div>').insertBefore('#addmore');
  });

  Trello.authorize({
    type: 'popup',
    name: 'DataWithoutBorders-Integration',
    scope: {
      read: 'true',
      write: 'true' },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
  });
});
