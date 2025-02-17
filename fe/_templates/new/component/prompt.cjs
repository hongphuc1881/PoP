module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'What is the name of component?',
      },
    ];

    return inquirer.prompt(questions).then(({ component_name }) => {
      const absCwd = process.env.NODENV_DIR || process.env.INIT_CWD;
      const cwd = absCwd.replace(`${process.cwd()}/`, '');
      const output_path = `${cwd}/${component_name}`;

      return {
        output_path,
        component_name,
      };
    });
  },
};
