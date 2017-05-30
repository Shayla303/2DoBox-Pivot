var ideaArray = [];

function ideasFromLocal() {
  var keys = Object.keys(localStorage);
  var keyLength = keys.length;
    for (var i = 0; i < keyLength; i++) {
      prependIdeaCard(JSON.parse(localStorage.getItem(keys[i])));
    }
    for (var j = 0; j < keyLength; j++) {
      ideaArray.push(JSON.parse(localStorage.getItem(keys[j])));
    } return ideaArray;
}

ideasFromLocal();

function clearInput() {
  $('.title-input').val('');
  $('.body-input').val('');
  disableBtn();
}

function constructNewIdea(title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'Swill';
}

function prependIdeaCard(newIdeaCard) {
  $('.bottom-section').prepend(`<section
    class="card-holder-section">
      <article class="idea-card" id=${newIdeaCard.id}>
        <div class="idea-name-section">
          <h2 contenteditable='true' class="idea-card-header">${newIdeaCard.title}</h2>
          <button class="delete-button" type="button" name="button"></button>
        </div>
        <div>
          <p contenteditable='true' class="article-text-container">${newIdeaCard.body}</p>
        </div>
        <div class="quality-control-container">
        <button class="upvote-button" type="button" name="button"></button>
        <button class="downvote-button" type="button" name="button"></button>
        <p>quality: <span class="quality">${newIdeaCard.quality}</p>
        </div>
      </article>
    </section>`);
  clearInput();
}

function storeIdeaCard(newIdeaCard) {
  localStorage.setItem(newIdeaCard.id, JSON.stringify(newIdeaCard));
}

function createIdea(event) {
  event.preventDefault();
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var newIdeaCard = new constructNewIdea(ideaTitle, ideaBody);
  constructNewIdea();
  prependIdeaCard(newIdeaCard);
  storeIdeaCard(newIdeaCard);
};

function disableBtn () {
  var title = $('.title-input').val();
  var body = $('.body-input').val();
  var hasContent = ((title === "") || (body === ""));
  $('.save-button').attr('disabled', hasContent);
}

function deleteIdea () {
  var id = $(this).closest('.idea-card').prop('id');
  localStorage.removeItem(id);
  $(this).parents('.idea-card').remove();
}

function titleContent() {
  var id = $(this).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  parseIdea.title = $(this).text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function bodyContent() {
  var id = $(this).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  parseIdea.body = $(this).text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function saveTitleOnEnter(event) {
  if (event.which == 13) {
    document.execCommand("DefaultParagraphSeparator", false, "p")
    var id = $(this).closest('.idea-card').prop('id');
    var parseIdea = JSON.parse(localStorage.getItem(id));
    parseIdea.title = $(this).text();
    localStorage.setItem(id, JSON.stringify(parseIdea));
  }
}

function saveBodyOnEnter(event) {
  if (event.which == 13) {
    document.execCommand("DefaultParagraphSeparator", false, "p");
    var id = $(this).closest('.idea-card').prop('id');
    var parseIdea = JSON.parse(localStorage.getItem(id));
    parseIdea.body = $(this).text();
    localStorage.setItem(id, JSON.stringify(parseIdea));
  }
}

function voteUp() {
  var id = $(this).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
    if (parseIdea.quality === 'Swill') {
      $(this).siblings('p').children().text('Plausible');
    } else if (parseIdea.quality === 'Plausible') {
      $(this).siblings('p').children().text('Genius');
    }
  parseIdea.quality = $(this).siblings('p').children().text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function voteDown() {
  var id = $(this).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
    if (parseIdea.quality === 'Genius') {
      $(this).siblings('p').children().text('Plausible');
    } else if (parseIdea.quality === 'Plausible') {
      $(this).siblings('p').children().text('Swill');
    }
  parseIdea.quality = $(this).siblings('p').children().text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function search(e) {
  var search = e.target.value.toUpperCase();
  var results = ideaArray.filter(function(newIdeaCard) {
   return newIdeaCard.title.toUpperCase().includes(search) || newIdeaCard.body.toUpperCase().includes(search) || newIdeaCard.quality.toUpperCase().includes(search);
  })
  $('.bottom-section').empty();
 results.forEach(function(result){
   prependIdeaCard(result);
 })
}

$('.save-button').on('click', createIdea);

$('.title-input').on('input', disableBtn);

$('.body-input').on('input', disableBtn);

$('.bottom-section').on('click','.delete-button', deleteIdea);

$('.bottom-section').on('keyup focusout','.idea-card-header', titleContent);

$('.bottom-section').on('keyup focusout','.article-text-container', bodyContent);

$('.bottom-section').on('keypress','.idea-card-header', saveTitleOnEnter);

$('.bottom-section').on('keypress','.article-text-container', saveBodyOnEnter);

$('.bottom-section').on('click', 'button.upvote-button', voteUp);

$('.bottom-section').on('click', 'button.downvote-button', voteDown);

$('.search-box').on('keyup blur', search)
