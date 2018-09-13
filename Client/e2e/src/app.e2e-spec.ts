import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  it('should display headline home page', () => {
    page.navigateTo();
    expect(page.getParagraphText("app-list")).toEqual('Projekte');
  });

  it('should display two projects', () => {
    page.navigateTo();
    expect(page.getCards().then(function(elements){
      elements[0].isPresent();
      elements[1].isPresent();
    }));
    expect(page.getButtonById('button').getText()).toEqual('ÖFFNEN');
  })
  
  /**
   * @description Wählt das erste Projekt
   */
  it('should choose first project, route to first project', () => {
    page.navigateTo();
    page.getCards().then(function(elements){
      elements[0].click();
    });
    browser.sleep(200);
    expect(page.getButtonStart().getText()).toEqual('START');
  })

  /**
   * @description Startet eine Projektumfrage. 
   */
  it('should start a Project', () => {
    page.navigateToPage('/project');
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(200);
    expect(page.getParagraphText('app-question')).toEqual('Wo würden Sie sich eher anmelden');
  })


  it('Projektumfrage: Sind alle Buttons da', () => {
    //muss vorher auf Projekt-Seite, da dort Daten geladen werden
    page.navigateToPage('/project');
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(2000);
    var type;
    page.getHeadlineQuestion().getText().then(function(text) {
      console.log(text);
      type=text;
      //if (type=="Hello World (favoriteQuestion)"){
      if (type=="Untersuchung zum Verhalten von Informatikern in Hochschulen (favoriteQuestion)"){  
      expect(page.getButton(0).isPresent()).toBeTruthy();
      expect(page.getButton(1).isPresent()).toBeTruthy();
  
      } else if (type=="Hello World (choiceQuestion)"){
        expect(page.getButton(0).isPresent()).toBeTruthy();
      expect(page.getButton(1).isPresent()).toBeTruthy();
  
      } else if (type=="Hello World (likeDislikeQuestion)"){
        expect(page.getButtonById('btn_like').isPresent()).toBeTruthy();
        expect(page.getButtonById('btn_dislike').isPresent()).toBeTruthy();
      
      } else if (type=="Hello World (likeQuestion)"){
        expect(page.getButton(0).isPresent()).toBeTruthy();
        expect(page.getButton(1).isPresent()).toBeTruthy();
  
      } else if (type=="Hello World (rankingQuestion)"){
        expect(page.getButton(0).isPresent()).toBeTruthy();
      expect(page.getButton(1).isPresent()).toBeTruthy();
  
      } else if (type=="Hello World (regulatorQuestion)"){
        expect(page.getButton(0).isPresent()).toBeTruthy();
      expect(page.getButton(1).isPresent()).toBeTruthy();
      expect(page.getButton(2).isPresent()).toBeTruthy();
      expect(page.getButton(3).isPresent()).toBeTruthy();
      } 
    });
  })

  it('Projektumfrage: Ersten Button click, andere Buttons disabled', () => {
    //muss vorher auf Projekt-Seite, da dort Daten geladen werden
    page.navigateToPage('/project');
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(2000);
    var type;
    page.getHeadlineQuestion().getText().then(function(text) {
      console.log(text);
      type=text;
      //if (type=="Hello World (favoriteQuestion)"){
      if (type=="Untersuchung zum Verhalten von Informatikern in Hochschulen (favoriteQuestion)"){
        browser.sleep(2000);
        page.getButton(1).click();
        expect(page.getButton(0).isEnabled()).toBeFalsy();
        expect(page.getButton(1).isEnabled()).toBeFalsy();
  
      } else if (type=="Hello World (choiceQuestion)"){
        page.getButton(1).click();
        expect(page.getButton(0).isEnabled()).toBeFalsy();
        expect(page.getButton(1).isEnabled()).toBeFalsy();
  
      } else if (type=="Hello World (likeDislikeQuestion)"){
        page.getButtonById('btn_like').click();
        browser.sleep(2000);
        expect(page.getButtonById('btn_dislike').isEnabled()).toBeFalsy();
      
      } else if (type=="Hello World (likeQuestion)"){
        page.getButton(1).click();
        browser.sleep(2000);
        expect(page.getButton(0).isEnabled()).toBeFalsy();
  
      } else if (type=="Hello World (rankingQuestion)"){
        page.getButton(0).click();
        expect(page.getButton(0).isEnabled()).toBeFalsy();
        page.getButton(1).click();
        browser.sleep(2000);
        expect(page.getButton(1).isEnabled()).toBeFalsy();
  
      } else if (type=="Hello World (regulatorQuestion)"){
        page.getButton(3).click();
        expect(page.getButton(0).isEnabled()).toBeFalsy();
        expect(page.getButton(1).isEnabled()).toBeFalsy();
        expect(page.getButton(2).isEnabled()).toBeFalsy();
      } 
    });
  })

  it('Projektumfrage: Eine Antwort auswählen und zur Feedback-Seite', () => {
    //muss vorher auf Projekt-Seite, da dort Daten geladen werden
    browser.waitForAngularEnabled(false);
    page.navigateToPage('/project');
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(5000);
    var type;
    page.getHeadlineQuestion().getText().then(function(text) {
      console.log(text);
      type=text;
      //if (type=="Hello World (favoriteQuestion)"){
        if (type=="Untersuchung zum Verhalten von Informatikern in Hochschulen (favoriteQuestion)"){
        console.log("Favorite");
        page.getButton(1).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
  
      } else if (type=="Hello World (choiceQuestion)"){
        console.log("Choice");
        page.getButton(1).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
  
      } else if (type=="Hello World (likeDislikeQuestion)"){
        console.log("LikeDislike");
        page.getButtonById('btn_like').click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
      
      } else if (type=="Hello World (likeQuestion)"){
        console.log("Like");
        page.getButton(1).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
  
      } else if (type=="Hello World (rankingQuestion)"){
        console.log("ranking");
        page.getButton(1).click();
        browser.sleep(4000);
        page.getButton(0).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
  
      } else if (type=="Hello World (regulatorQuestion)"){
        console.log("Regulator");
        page.getButton(3).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
      } 
    });
  })


});

