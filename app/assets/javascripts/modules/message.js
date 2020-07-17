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

  $('.formContents').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message').append(html);
      $('.formContents')[0].reset();
      $('.Chat-main__message').animate({ scrollTop: $('.Chat-main__message')[0].scrollHeight});
      $('.sendBtn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.sendBtn').prop("disabled", false);
    });
  });
});