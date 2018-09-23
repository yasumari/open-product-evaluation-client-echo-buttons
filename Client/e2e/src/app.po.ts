import { browser, by, element, $, $$ } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get('/');
  }

  navigateToPage(pagename) {
    browser.waitForAngularEnabled(false);
    return browser.get(pagename);
  }

  getParagraphText(appPage) {
    return $(appPage + ' h1').getText();
  }

  getCards(){
    return $$('app-list .card');
  }

  getButtonStart(){
    return $('app-project a');
  }

  getButtonById(btn_id){
    return element(by.id(btn_id));
  }

  getImages(){
    return $$('app-question img');
  }

  getImagesFeedback(){
    return $$('app-feedback img');
  }
  getInputByName(stringname){
    return element(by.name(stringname));
  }

  getButton(num){
    return element(by.name("button"+num));
  }

  getProgressBar(){
    return element(by.className("progress-bar"));
  }
  getHeadlineFeedback(){
    return element(by.css('h1'));
  }

  getHeadlineQuestion(){
    return element(by.css('h3'));
  }

  getQuestionDiv(name){
    return element(by.name(name));
  }

}
