import {describe, it, expect} from '@jest/globals';

import {createTestPage} from '../../testing';

describe('intl-locale', () => {
  it('produces consistent locale as the Intl APIs', async () => {
    await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="en-US"></intl-locale>
        <intl-locale tag="en-US" base-name="zh" region="HK"></intl-locale>
        <intl-locale tag="zh-Hant-u-ca-chinese"></intl-locale>
        <intl-locale tag="es" region="419"></intl-locale>
        <intl-locale tag="sr" script="Latn"></intl-locale>
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
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="veryveryinvalid"></intl-locale>
      `,
    });

    expect(page.element.value).toBeNull();
  });

  it('produces consistent string value as the Intl APIs', async () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="ja" calendar="japanese" numeric></intl-locale>
      `,
    });

    const intlResult = new Intl.Locale('ja', {
      calendar: 'japanese',
      numeric: true,
    }).toString();
    expect(page.element.valueAsString).toBe(intlResult);
  });

  it('produces consistent maximized value as the Intl APIs', async () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="ja" calendar="japanese" numeric></intl-locale>
      `,
    });

    const intlResult = new Intl.Locale('ja', {
      calendar: 'japanese',
      numeric: true,
    }).maximize();
    expect(page.element.maximize()).toEqual(intlResult);
  });

  it('produces consistent minimized value as the Intl APIs', async () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="ja" calendar="japanese" numeric></intl-locale>
      `,
    });

    const intlResult = new Intl.Locale('ja', {
      calendar: 'japanese',
      numeric: true,
    }).minimize();
    expect(page.element.minimize()).toEqual(intlResult);
  });

  it('prints out correct string value', async () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="ko" script="kore" region="kr"
            hourCycle="h24" display-string>
        </intl-locale>
      `,
    });

    const intlResult = new Intl.Locale('ko', {
      script: 'kore',
      region: 'kr',
      hourCycle: 'h24',
    }).toString();
    expect(page.element.textContent.trim()).toBe(intlResult);
  });

  it('prints out correct maximized string value', async () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="ko" script="kore" region="kr"
            hourCycle="h24" display-maximized>
        </intl-locale>
      `,
    });

    const intlResult = new Intl.Locale('ko', {
      script: 'kore',
      region: 'kr',
      hourCycle: 'h24',
    }).maximize().toString();
    expect(page.element.textContent.trim()).toBe(intlResult);
  });

  it('prints out correct minimized string value', async () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="ko" script="kore" region="kr"
            hourCycle="h24" display-minimized>
        </intl-locale>
      `,
    });

    const intlResult = new Intl.Locale('ko', {
      script: 'kore',
      region: 'kr',
      hourCycle: 'h24',
    }).minimize().toString();
    expect(page.element.textContent.trim()).toBe(intlResult);
  });

  it('produces correct `calendars` property', async  () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="en-US"></intl-locale>
      `,
    });

    // @ts-ignore
    const intlResult = new Intl.Locale('en-US').calendars;
    expect(page.element.calendars).toEqual(intlResult);
  });

  it('produces correct `hourCycles` property', async  () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="en-US"></intl-locale>
      `,
    });

    // @ts-ignore
    const intlResult = new Intl.Locale('en-US').hourCycles;
    expect(page.element.hourCycles).toEqual(intlResult);
  });

  it('produces correct `numberingSystems` property', async  () => {
    const page = await createTestPage({
      element: 'intl-locale',
      html: `
        <intl-locale tag="fa-IR"></intl-locale>
      `,
    });

    // @ts-ignore
    const intlResult = new Intl.Locale('fa-IR').numberingSystems;
    expect(page.element.numberingSystems).toEqual(intlResult);
  });

  it('produces correct `textInfo` property', async  () => {
    await createTestPage({
      element: 'intl-locale',
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
      element: 'intl-locale',
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
      element: 'intl-locale',
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
