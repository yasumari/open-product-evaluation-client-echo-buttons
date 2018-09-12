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

  getElementByClass(className){
    return $(className);
  }

  getCards(){
    return $$('app-list .card-title');
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

  getButton(num){
    return element(by.name("button"+num));
  }

  getHeadlineFeedback(){
    return element(by.css('h1'));
  }

  getHeadlineQuestion(){
    return element(by.css('h3'));
  }

}
