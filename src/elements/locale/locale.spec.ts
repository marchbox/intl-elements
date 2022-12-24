import {createTestPage} from '../../testing';
import HTMLIntlLocaleElement from './locale';

describe('intl-locale', () => {
  it('produces consistent locale as the Intl APIs', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="en-US"></intl-locale>
        <intl-locale tag="en-US" option-basename="zh" option-region="HK"></intl-locale>
        <intl-locale tag="zh-Hant-u-ca-chinese"></intl-locale>
        <intl-locale tag="es" option-region="419"></intl-locale>
        <intl-locale tag="sr" option-script="Latn"></intl-locale>
      `,
    });

    const els = document.querySelectorAll('intl-locale');

    const intlResult1 = new Intl.Locale('en-US');
    expect(els[0]!.value).toEqual(intlResult1);

    const intlResult2 = new Intl.Locale('en-US', {
      baseName: 'zh',
      region: 'HK',
    });
    expect(els[1]!.value).toEqual(intlResult2);

    const intlResult3 = new Intl.Locale('zh-Hant-u-ca-chinese');
    expect(els[2]!.value).toEqual(intlResult3);

    const intlResult4 = new Intl.Locale('es', {
      region: '419',
    });
    expect(els[3]!.value).toEqual(intlResult4);

    const intlResult5 = new Intl.Locale('sr', {
      script: 'Latn',
    });
    expect(els[4]!.value).toEqual(intlResult5);
  });

  it('handles invalid locale without error and returns null', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="veryveryinvalid"></intl-locale>
      `,
    });

    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    expect(el.value).toBeNull();
    expect(el.valueAsString).toBe('');

    expect(el.baseName).toBeUndefined();
    expect(el.optionBaseName).toBeUndefined();
    expect(el.language).toBeUndefined();
    expect(el.optionLanguage).toBeUndefined();
    expect(el.script).toBeUndefined();
    expect(el.optionScript).toBeUndefined();
    expect(el.region).toBeUndefined();
    expect(el.optionRegion).toBeUndefined();
    expect(el.numeric).toBeUndefined();
    expect(el.optionNumeric).toBeUndefined();
    expect(el.hourCycle).toBeUndefined();
    expect(el.optionHourCycle).toBeUndefined();
    expect(el.hourCycles).toBeUndefined();
    expect(el.calendar).toBeUndefined();
    expect(el.optionCalendar).toBeUndefined();
    expect(el.calendars).toBeUndefined();
    expect(el.caseFirst).toBeUndefined();
    expect(el.optionCaseFirst).toBeUndefined();
    expect(el.collation).toBeUndefined();
    expect(el.optionCollation).toBeUndefined();
    expect(el.numberingSystem).toBeUndefined();
    expect(el.optionNumberingSystem).toBeUndefined();
    expect(el.numberingSystems).toBeUndefined();
    expect(el.textInfo).toBeUndefined();
    expect(el.timeZones).toBeUndefined();
    expect(el.weekInfo).toBeUndefined();
  });

  it('produces consistent string value as the Intl APIs', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="ja" option-calendar="japanese" option-numeric></intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    const intlResult = new Intl.Locale('ja', {
      calendar: 'japanese',
      numeric: true,
    }).toString();
    expect(el.valueAsString).toBe(intlResult);
  });

  it('produces consistent maximized value as the Intl APIs', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="ja" option-calendar="japanese" option-numeric></intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    const intlResult = new Intl.Locale('ja', {
      calendar: 'japanese',
      numeric: true,
    }).maximize();
    expect(el.maximize()).toEqual(intlResult);
  });

  it('produces consistent minimized value as the Intl APIs', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="ja" option-calendar="japanese" option-numeric></intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    const intlResult = new Intl.Locale('ja', {
      calendar: 'japanese',
      numeric: true,
    }).minimize();
    expect(el.minimize()).toEqual(intlResult);
  });

  it('prints out correct string value', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="ko" option-script="kore" option-region="kr"
            option-hourcycle="h24" display-string>
        </intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    const intlResult = new Intl.Locale('ko', {
      script: 'kore',
      region: 'kr',
      hourCycle: 'h24',
    }).toString();
    expect(el).toHaveTextContent(intlResult);
  });

  it('prints out empty string if locale is invalid', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="veryveryinvalid" display-string>
        </intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    expect(el).toHaveTextContent('');
  });

  it('prints out correct maximized string value', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="ko" option-script="kore" option-region="kr"
            option-hourcycle="h24" display-maximized>
        </intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    const intlResult = new Intl.Locale('ko', {
      script: 'kore',
      region: 'kr',
      hourCycle: 'h24',
    }).maximize().toString();
    expect(el).toHaveTextContent(intlResult);
  });

  it('prints out empty maximized string if locale is invalid', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="veryveryinvalid" display-maximized>
        </intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    expect(el).toHaveTextContent('');
  });

  it('prints out correct minimized string value', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="ko" option-script="kore" option-region="kr"
            option-hourcycle="h24" display-minimized>
        </intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    const intlResult = new Intl.Locale('ko', {
      script: 'kore',
      region: 'kr',
      hourCycle: 'h24',
    }).minimize().toString();
    expect(el).toHaveTextContent(intlResult);
  });

  it('prints out empty minimized string if locale is invalid', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="veryveryinvalid" display-minimized>
        </intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    expect(el).toHaveTextContent('');
  });

  it('has both option properties and exposed built-in properties', async () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="en" option-basename="zh" option-language="en"
            option-script="latn" option-region="us" option-numeric
            option-hourcycle="H24" option-calendar="greGOry" option-casefirst="upPer"
            option-collation="phoNEbk" option-numberingsystem="arAb"
        ></intl-locale>
      `,
    });

    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    const intlResult = new Intl.Locale('en', {
      baseName: 'zh',
      language: 'en',
      script: 'latn',
      region: 'us',
      numeric: true,
      hourCycle: 'h24',
      calendar: 'gregory',
      caseFirst: 'upper',
      collation: 'phonebk',
      numberingSystem: 'arab',
    });

    expect(el.baseName).toBe('en-Latn-US');
    expect(el.optionBaseName).toBe('zh');
    expect(el.language).toBe(el.optionLanguage);
    expect(el.script).toBe('Latn');
    expect(el.optionScript).toBe('Latn');
    expect(el.region).toBe('US');
    expect(el.optionRegion).toBe('US');
    expect(el.numeric).toBe(true);
    expect(el.optionNumeric).toBe(true);
    expect(el.hourCycle).toBe('h24');
    expect(el.optionHourCycle).toBe('h24');
    expect(el.hourCycles).toEqual(['h24']);
    expect(el.calendar).toBe('gregory');
    expect(el.optionCalendar).toBe('gregory');
    expect(el.calendars).toEqual(['gregory']);
    expect(el.caseFirst).toBe('upper');
    expect(el.optionCaseFirst).toBe('upper');
    expect(el.collation).toBe('phonebk');
    expect(el.optionCollation).toBe('phonebk');
    expect(el.numberingSystem).toBe('arab');
    expect(el.optionNumberingSystem).toBe('arab');
    expect(el.numberingSystems).toEqual(['arab']);
    expect(el.textInfo).toEqual({direction: 'ltr'});
    // @ts-ignore
    expect(el.timeZones).toEqual(intlResult.timeZones);
    // @ts-ignore
    expect(el.weekInfo).toEqual(intlResult.weekInfo);
  });

  it('produces correct `calendars` property', async  () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="en-US"></intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    // @ts-ignore
    const intlResult = new Intl.Locale('en-US').calendars;
    expect(el.calendars).toEqual(intlResult);
  });

  it('produces correct `hourCycles` property', async  () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="en-US"></intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    // @ts-ignore
    const intlResult = new Intl.Locale('en-US').hourCycles;
    expect(el.hourCycles).toEqual(intlResult);
  });

  it('produces correct `numberingSystems` property', async  () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="fa-IR"></intl-locale>
      `,
    });
    const el = document.querySelector('intl-locale') as HTMLIntlLocaleElement;

    // @ts-ignore
    const intlResult = new Intl.Locale('fa-IR').numberingSystems;
    expect(el.numberingSystems).toEqual(intlResult);
  });

  it('produces correct `textInfo` property', async  () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="ar"></intl-locale>
        <intl-locale tag="am"></intl-locale>
      `,
    });

    const els = document.querySelectorAll('intl-locale');

    // @ts-ignore
    const intlResult1 = new Intl.Locale('ar').textInfo;
    // @ts-ignore
    const intlResult2 = new Intl.Locale('am').textInfo;

    expect(els[0]?.textInfo).toEqual(intlResult1);
    expect(els[1]?.textInfo).toEqual(intlResult2);
  });

  it('produces correct `timeZones` property', async  () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="en-US"></intl-locale>
        <intl-locale tag="zh-CN"></intl-locale>
        <intl-locale tag="ar"></intl-locale>
      `,
    });

    const els = document.querySelectorAll('intl-locale');

    // @ts-ignore
    const intlResult1 = new Intl.Locale('en-US').timeZones;
    // @ts-ignore
    const intlResult2 = new Intl.Locale('zh-CN').timeZones;
    // @ts-ignore
    const intlResult3 = new Intl.Locale('ar').timeZones;

    expect(els[0]?.timeZones).toEqual(intlResult1);
    expect(els[1]?.timeZones).toEqual(intlResult2);
    expect(els[2]?.timeZones).toEqual(intlResult3);
  });

  it('produces correct `weekInfo` property', async  () => {
    await createTestPage({
      elements: ['intl-locale'],
      html: `
        <intl-locale tag="de-AT"></intl-locale>
        <intl-locale tag="zh-Hant-TW-u-ca-chinese"></intl-locale>
        <intl-locale tag="ar"></intl-locale>
      `,
    });

    const els = document.querySelectorAll('intl-locale');

    // @ts-ignore
    const intlResult1 = new Intl.Locale('de-AT').weekInfo;
    // @ts-ignore
    const intlResult2 = new Intl.Locale('zh-Hant-TW-u-ca-chinese').weekInfo;
    // @ts-ignore
    const intlResult3 = new Intl.Locale('ar').weekInfo;

    expect(els[0]?.weekInfo).toEqual(intlResult1);
    expect(els[1]?.weekInfo).toEqual(intlResult2);
    expect(els[2]?.weekInfo).toEqual(intlResult3);
  });
});
