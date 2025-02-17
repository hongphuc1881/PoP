function camelize(word) {
  if (word == null) {
    return word;
  }
  if (word.length == 1) {
    return word.charAt(0).toUpperCase();
  }
  return word
    .split('-')
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
      const absCwd = process.env.NODE_DIR || process.env.INIT_CWD;
      const cwd = absCwd.replace(`${process.cwd()}/`, '');
      const output_path = `${cwd}/${page_name}`;
      const page_path = `${cwd.replace('src/pages/', '')}/${page_name}`;
      const pc_component_name = camelize(`pc_${page_name}`);
      const sp_component_name = camelize(`sp_${page_name}`);

      return {
        output_path,
        page_name,
        pc_component_name,
        sp_component_name,
        page_path,
      };
    });
  },
};
