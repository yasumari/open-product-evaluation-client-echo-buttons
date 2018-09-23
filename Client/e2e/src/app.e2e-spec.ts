import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('T1: should display headline home page', () => {
    page.navigateTo();
    expect(page.getParagraphText("app-list")).toEqual('Projekte');
  });

  /** Testfall 2
   * @description Wählt das erste Projekt
   */
  it('T2: should choose first project, route to first project', () => {
    page.navigateTo();
    page.getCards().then(function (elements) {
      elements[0].click();
    });
    browser.sleep(200);
    expect(page.getButtonStart().getText()).toEqual('START');
  })

  /** Testfall 3
   * @description Startet eine Projektumfrage. 
   */
  it('T3: should start a Project', () => {
    page.navigateToPage("/project");
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(200);
    expect(page.getParagraphText('app-question')).toEqual('Bitte treffen Sie eine Auswahl:');
  })

  /** Testfall 4
   * @description Bei einer Frage müssen die benötigten Buttons gezeigt werden
   */
  it('T4: Projektumfrage: Sind alle Buttons da', () => {
    //muss vorher auf Projekt-Seite, da dort Daten geladen werden
    page.navigateTo();
    page.getCards().then(function (elements) {
      elements[0].click();
    });
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(4000);

    element(by.tagName("FavoriteQuestion")).isPresent().then(function (result) {
      if (result) {
        expect(page.getButton(0).isPresent()).toBe(true);
        expect(page.getButton(1).isPresent()).toBe(true);
      }
    });
    element(by.tagName("ChoiceQuestion")).isPresent().then(function (result) {
      if (result) {
        expect(page.getInputByName("input0").isPresent()).toBe(true);
        expect(page.getInputByName("input1").isPresent()).toBe(true);
      }
    });

    element(by.tagName("LikeDislikeQuestion")).isPresent().then(function (result) {
      if (result) {
        expect(page.getButtonById("btn_like").isPresent()).toBe(true);
        expect(page.getButtonById("btn_dislike").isPresent()).toBe(true);
      }
    });
    element(by.tagName("LikeDislikeQuestion")).isPresent().then(function (result) {
      if (result) {
        expect(page.getButtonById('btn_like').isPresent()).toBe(true);
        expect(page.getButtonById('btn_dislike').isPresent()).toBe(true);
      }
    });
    element(by.tagName("LikeQuestion")).isPresent().then(function (result) {
      if (result) {
        expect(page.getButton(0).isPresent()).toBe(true);
        expect(page.getButton(1).isPresent()).toBe(true);
      }
    });
    element(by.tagName("RankingQuestion")).isPresent().then(function (result) {
      if (result) {
        expect(page.getButton(0).isPresent()).toBe(true);
        expect(page.getButton(1).isPresent()).toBe(true);
      }
    });

    element(by.tagName("RegulatorQuestion")).isPresent().then(function (result) {
      if (result) {
        expect(page.getButton(0).isPresent()).toBe(true);
        expect(page.getButton(1).isPresent()).toBe(true);
        expect(page.getButton(2).isPresent()).toBe(true);
        expect(page.getButton(3).isPresent()).toBe(true);
      }
    });
  });


  /** Testfall 5
   * @description Nachdem eine Antwort ausgewählt wurde, 
   * sind die anderen Buttons disabled (Ausnahme: RankingQuestions)
   */
  it('T5: Projektumfrage: Choose one answer, buttons are disabled', () => {
    //muss vorher auf Projekt-Seite, da dort Daten geladen werden
    browser.waitForAngularEnabled(false);
    page.navigateToPage("/project");
    browser.sleep(400);
    page.getButtonStart().click();
    browser.sleep(4000);

    element(by.tagName("FavoriteQuestion")).isPresent().then(function (result) {
      if (result) {
        browser.sleep(2000);
        page.getButton(1).click();
        expect(page.getButton(0).isEnabled()).toBeFalsy();
        expect(page.getButton(1).isEnabled()).toBeFalsy();
      }
    });
    element(by.tagName("ChoiceQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getInputByName("input0").click();
        expect(page.getInputByName("input0").isEnabled()).toBeFalsy();
        expect(page.getInputByName("input1").isEnabled()).toBeFalsy();
        expect(page.getInputByName("input0").isPresent()).toBe(true);
        expect(page.getInputByName("input1").isPresent()).toBe(true);
      }
    });

    element(by.tagName("LikeDislikeQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButtonById('btn_like').click();
        browser.sleep(2000);
        expect(page.getButtonById('btn_dislike').isEnabled()).toBeFalsy();
      }
    });
    element(by.tagName("LikeQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButton(0).click();
        browser.sleep(2000);
        expect(page.getButton(0).isEnabled()).toBeFalsy();
      }
    });
    element(by.tagName("RegulatorQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButton(1).click();
        expect(page.getButton(0).isEnabled()).toBeFalsy();
      }
    });
    element(by.tagName("RankingQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButton(0).click();
        expect(page.getButton(0).isEnabled()).toBeFalsy();
        page.getButton(1).click();
        browser.sleep(2000);
        expect(page.getButton(1).isEnabled()).toBeFalsy();
      }
    });
  })



  /** Testfall 6
    * @description Nach Beantworten einer Frage gelangt man zur Feedback-Seite
    */
  it('T6: Projektumfrage: Eine Antwort auswählen und zur Feedback-Seite', () => {
    //muss vorher auf Projekt-Seite, da dort Daten geladen werden
    browser.waitForAngularEnabled(false);
    page.navigateToPage("/project");
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(4000);

    element(by.tagName("FavoriteQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButton(1).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
      }
    });

    element(by.tagName("ChoiceQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getInputByName("input1").click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
      }
    });
    element(by.tagName("LikeDislikeQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButtonById('btn_like').click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
      }
    });
    element(by.tagName("LikeQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButton(0).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
      }
    });
    element(by.tagName("RegulatorQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButton(3).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
      }
    });
    element(by.tagName("RankingQuestion")).isPresent().then(function (result) {
      if (result) {
        page.getButton(1).click();
        browser.sleep(4000);
        page.getButton(0).click();
        browser.sleep(4000);
        expect(page.getParagraphText('app-feedback')).toEqual("Weiter geht's zur nächsten Frage!");
      }
    });
  });

  /**Testfall 7 
   * @description
   * Das ausgwählte Bild sollte die gleiche URL haben wie im Feedback
   */
  it('T7: im Feedback richtiges Bild anzeigen', () => {
    browser.waitForAngularEnabled(false);
    page.navigateToPage("/project");
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(9000);

    //Bekannt, dass es eine Choice-Frage ist. 
    page.getInputByName("input0").click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //LIKEQUESTION
    page.getButton(0).click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //LikeDislike
    page.getButton(0).click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //regulator
    page.getButton(1).click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //Favorite 
    let scr;
    page.getImages().then(function (elements) {
      elements[0].getAttribute("src").then(function (value) {
        scr = value;
        return value;
      });
    });
    page.getButton(0).click();
    browser.sleep(3000);
    page.getImagesFeedback().then(function (element) {
      expect(element[0].getAttribute("src")).toEqual(scr);
    })
  })
  /**
    * Testfall 8
    * @description Nach Beantworten aller Fragen, kommt man zum Ende
    */
  it('T8: Alle Fragen des Tests 1 (links) beantworten, zum Ende', () => {
    browser.waitForAngularEnabled(false);
    page.navigateToPage("/project");
    browser.sleep(200);
    page.getButtonStart().click();
    browser.sleep(9000);

    //Bekannt, dass es eine Choice-Frage ist. 
    page.getInputByName("input0").click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //LIKEQUESTION
    page.getButton(0).click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //LikeDislike
    page.getButton(0).click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //regulator
    page.getButton(1).click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //Favorite
    page.getButton(0).click();
    browser.sleep(3000);
    page.getButtonById('button').click();
    browser.sleep(3000);

    //Ranking
    page.getButton(0).click();
    page.getButton(1).click();
    browser.sleep(3000);
    expect(page.getHeadlineFeedback().getText()).toEqual("Das war's!");
  })
});