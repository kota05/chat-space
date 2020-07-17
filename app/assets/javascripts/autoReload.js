$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = `<div class="Chat-main__message--box" data-message-id=${message.id}>
                    <div class="Chat-main__message--box--name">
                      ${message.user_name}
                    </div>
                    <div class="Chat-main__message--box--date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Chat-main__message--coment">
                    ${message.content}
                    <img class="Message__image" src="${message.image}">
                  </div>`
      return html;
    } else {
      let html = `<div class="Chat-main__message--box" data-message-id=${message.id}>
                    <div class="Chat-main__message--box--name">
                      ${message.user_name}
                    </div>
                    <div class="Chat-main__message--box--date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Chat-main__message--coment">
                    ${message.content}
                  </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Chat-main__message--box:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Chat-main__message').append(insertHTML);
        $('.Chat-main__message').animate({ scrollTop: $('.Chat-main__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});