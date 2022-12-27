import {markdownTable} from 'markdown-table';

const TABLE_COLUMNS = new Map([
  ['name', {heading: 'Name', code: true}],
  ['type', {heading: 'Type', code: true}],
  ['return', {heading: 'Return', code: true}],
  ['default', {heading: 'Default', code: true}],
  ['description', {heading: 'Description'}],
  ['fieldName', {heading: 'Property', code: true}],
  ['attribute', {heading: 'Attribute', code: true}],
  ['readonly', {heading: 'Read only?'}],
]);

const SECTIONS = [
  {
    heading: 'Attributes',
    key: 'attributes',
    items: ['name', 'type', 'default', 'description', 'fieldName'],
  },
  {
    heading: 'Properties',
    key: 'properties',
    items: ['name', 'type', 'default', 'readonly', 'description', 'attribute'],
  },
  {
    heading: 'Methods',
    key: 'methods',
    items: ['name', 'return', 'description', 'intl', 'intlsee'],
  },
  {
    heading: 'Slots',
    key: 'slots',
    items: ['name', 'description'],
  },
  {
    heading: 'CSS Parts',
    key: 'cssParts',
    items: ['name', 'description'],
  },
];

function transformData(data) {
  const properties = [];
  const methods = [];

  data.members.forEach(member => {
    if (member.kind === 'method') {
      methods.push(member);
    } else {
      properties.push(member);
    }
  });

  Object.assign(data, {properties, methods});

  return data;
}

function getTable(section, data) {
  return [
    section.items.map(key => TABLE_COLUMNS.get(key)?.heading).filter(Boolean),
    ...data.map(item => section.items.map(key => {
      if (!TABLE_COLUMNS.has(key)) {
        return null;
      }

      let value = item[key];

      switch (key) {
        case 'type':
          value = item[key].text;
          break;
        case 'return':
          value = item[key]?.type.text;
          break;
        case 'default':
          value = value || 'undefined';
          break;
        case 'readonly':
          value = value ? 'Yes' : '';
          break;
        case 'description':
          if (item.intl && item.intlsee) {
            value = [
              value,
              `[Learn more about \`${item.intl}\`](${item.intlsee})`,
            ].filter(Boolean).join(' ');
          }
          break;
      }

      value = value?.replace('|', '\\|');

      return !value ? '' :
          TABLE_COLUMNS.get(key).code ? `\`${value}\`` : value.toString();
    }).filter(v => v !== null)),
  ];
}

export default function generateMarkdown(module) {
  const md = [];
  const data = transformData(module.declarations[0]);

  if (data.intlprovider) {
    md.push(`# \`${data.intl}\` elements`);
  }

  md.push(
    `## \`<${data.tagName}>\` (\`${data.name}\`)`,
    `[Learn more about \`${data.intl}\`](${data.intlsee})`,
  );
  if (data.description) {
    md.push(data.description);
  }
  SECTIONS.forEach(section => {
    if (!data[section.key]?.length) {
      return;
    }

    md.push(
      `### ${section.heading}`,
      markdownTable(getTable(section, data[section.key]))
    );
  });

  return md.join('\n\n');
}
