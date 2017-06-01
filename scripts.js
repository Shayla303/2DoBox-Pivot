function ideasFromLocal() {
  $('.bottom-section').empty()
  var ideaArray = [];
  var keys = Object.keys(localStorage);
  var keyLength = keys.length;
    for (var i = 0; i < keyLength; i++) {
      prependIdeaCard(JSON.parse(localStorage.getItem(keys[i])));
    }
    for (var j = 0; j < keyLength; j++) {
      ideaArray.push(JSON.parse(localStorage.getItem(keys[j])));
    }
    return ideaArray
}

ideasFromLocal();

removeCompleted();

showTen();

function showTen () {
  $('.idea-card').slice(10).css("display", "none")
}

function clearInput() {
  $('.title-input').val('');
  $('.task-input').val('');
  disableBtn();
}

function constructNewIdea(title, body) {
  var importance = ['None', 'Low', 'Normal', 'High', 'Critical'];
  this.title = title;
  this.task = body;
  this.id = Date.now();
  this.quality = importance[2];
}

function prependIdeaCard(newIdeaCard) {
  $('.bottom-section').prepend(`<section
    class="card-holder-section">
      <article class="idea-card ${newIdeaCard.completed}" id=${newIdeaCard.id}>
        <div class="idea-name-section">
          <h2 contenteditable='true' class="idea-card-header ${newIdeaCard.crossedOut}">${newIdeaCard.title}</h2>
          <button class="delete-button" type="button" name="button"></button>
        </div>
        <div>
          <p contenteditable='true' class="article-text-container">${newIdeaCard.task}</p>
        </div>
        <div class="quality-control-container">
        <button class="upvote-button" type="button" name="button"></button>
        <button class="downvote-button" type="button" name="button"></button>
        <p>Importance: <span class="quality">${newIdeaCard.quality}</p>
        <button class="complete" type="button" name="complete">Complete Task</button></div>
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
  var ideaTask = $('.task-input').val();
  var newIdeaCard = new constructNewIdea(ideaTitle, ideaTask);
  constructNewIdea();
  prependIdeaCard(newIdeaCard);
  storeIdeaCard(newIdeaCard);
};

function disableBtn () {
  var title = $('.title-input').val();
  var task = $('.task-input').val();
  var hasContent = ((title === "") || (task === ""));
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
  parseIdea.task = $(this).text();
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

function saveTaskOnEnter(event) {
  if (event.which == 13) {
    document.execCommand("DefaultParagraphSeparator", false, "p");
    var id = $(this).closest('.idea-card').prop('id');
    var parseIdea = JSON.parse(localStorage.getItem(id));
    parseIdea.task = $(this).text();
    localStorage.setItem(id, JSON.stringify(parseIdea));
  }
}

function voteUp() {
  var importance = ['None', 'Low', 'Normal', 'High', 'Critical'];
  var id = $(this).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  var important = $(this).siblings('p').children().text()
  var index = importance.indexOf(important);
  $(this).siblings('p').children().text(importance[index + 1]);
  parseIdea.quality = $(this).siblings('p').children().text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function voteDown() {
  var importance = ['None', 'Low', 'Normal', 'High', 'Critical'];
  var id = $(this).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  var important = $(this).siblings('p').children().text()
  var index = importance.indexOf(important);
  $(this).siblings('p').children().text(importance[index - 1]);
  parseIdea.quality = $(this).siblings('p').children().text();
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function search(e) {
  var ideaArray = ideasFromLocal();
  var search = e.target.value.toUpperCase();
  var results = ideaArray.filter(function(newIdeaCard) {
   return newIdeaCard.title.toUpperCase().includes(search) || newIdeaCard.task.toUpperCase().includes(search) || newIdeaCard.quality.toUpperCase().includes(search);
  })
  $('.bottom-section').empty();
 results.forEach(function(result){
   prependIdeaCard(result);
 })
}

function completeTask () {
  var id = $(this).closest('.idea-card').prop('id');
  var parseIdea = JSON.parse(localStorage.getItem(id));
  $(this).closest('.idea-card').toggleClass('completed');
  $(this).parents('.idea-card').find('h2').toggleClass('crossed-out');
  parseIdea.crossedOut = $(this).parents('.idea-card').find('h2').attr('class');
  parseIdea.completed = $(this).closest('.idea-card').attr('class');
  localStorage.setItem(id, JSON.stringify(parseIdea));
}

function removeCompleted() {
  var ideaArray = ideasFromLocal();
  var toDos = ideaArray.filter(function(todo) {
    return !todo.completed;
  });
  $('.bottom-section').empty();
  toDos.forEach(function(toDo){
    prependIdeaCard(toDo)
  })
};

function findImportance() {
  var ideaArray = ideasFromLocal();
  var buttonText = $(this).text();
  var results = ideaArray.filter(function(newIdeaCard) {
    return newIdeaCard.quality === buttonText;
  })
  $('.bottom-section').empty();
 results.forEach(function(result){
   prependIdeaCard(result);
 })
}

$('.save-button').on('click', createIdea);
$('.title-input').on('input', disableBtn);
$('.task-input').on('input', disableBtn);
$('.bottom-section').on('click','.delete-button', deleteIdea);
$('.bottom-section').on('keyup focusout','.idea-card-header', titleContent);
$('.bottom-section').on('keyup focusout','.article-text-container', bodyContent);
$('.bottom-section').on('keypress','.idea-card-header', saveTitleOnEnter);
$('.bottom-section').on('keypress','.article-text-container', saveTaskOnEnter);
$('.bottom-section').on('click', 'button.upvote-button', voteUp);
$('.bottom-section').on('click', 'button.downvote-button', voteDown);
$('.bottom-section').on('click', 'button.complete', completeTask);
$('.search-box').on('keyup blur', search)
$('.more-todos').click(function(event) {
    ideasFromLocal();
    removeCompleted()
  });
$('.none-btn').on('click', findImportance)
$('.low-btn').on('click', findImportance)
$('.normal-btn').on('click', findImportance)
$('.high-btn').on('click', findImportance)
$('.critical-btn').on('click', findImportance)
