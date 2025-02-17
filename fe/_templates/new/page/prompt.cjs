function camelize(word) {
  if (word == null) {
    return word;
  }
  if (word.length == 1) {
    return word.charAt(0).toUpperCase();
  }
  return word
    .split('_')
    .map((w) => {
      const car = w.charAt(0).toUpperCase();
      const cdr = w.slice(1);
      return `${car}${cdr}`;
    })
    .join('');
}

module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'input',
        name: 'page_name',
        message: 'What is the name of page?',
      },
    ];

    return inquirer.prompt(questions).then(({ page_name }) => {
      const output_path = `src/pages/${page_name}`;
      page_name = camelize(`${page_name}`);
      const pc_component_name = camelize(`${page_name}Pc`);
      const sp_component_name = camelize(`${page_name}Sp`);

      return {
        output_path,
        page_name,
        pc_component_name,
        sp_component_name,
      };
    });
  },
};
