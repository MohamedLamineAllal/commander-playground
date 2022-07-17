#!/usr/bin/env node

const { Command } = require('commander');

const version = '1.0.0';

// IIFE
(async () => {
  const program = new Command();

  program
    .name('commander-play')
    .version(version)
    // global options go here
    .option('--tell-me', 'Add a magic affirmation log', false);
  // Then commands go
  /**
   * For commands its nice to separate each new used one by a using the program reference and a space
   */

  program
    .command('hello', {
      isDefault: true,
    })
    .description('Hello greating command for fun')
    .option('--name <val>', 'say your name to be displayed.')
    .option('--magic', 'Add a magic affirmation', false)
    .action((...args) => {
      const [opts] = args;
      console.log('🚀 ~ file: index.js ~ line 22 ~ .action ~ args', args);
      let output = 'Hello';
      if (opts.name) {
        output += ` ${opts.name}`;
      }
      if (opts.magic) {
        output += ` . You are a thriving magician.`;
      }
      console.log(output);
    });

  program
    .command('testArgs')
    .description(
      'Testing args order against options for action callback. And testing no optional args '
    )
    .argument('<specialWord>', 'Special word to give')
    .option('--magic', 'Add a magic affirmation', false)
    .argument('[specialSkill]', 'Special skill to give')
    .action((...args) => {
      const [specialWord, specialSkill, opts, cmd] = args;
      console.log('🚀 ~ file: index.js ~ line 45 ~ .action ~ args', args);
      console.log(`Your special word is: ${specialWord}`);
      console.log(
        "Always be special. And make all special. That's a magic line."
      );
      console.log(
        'In this first step the specialWord arg is mandatory. You did provide it which is great.\nOtherwise you would get an error.'
      );

      if (specialSkill) {
        console.log(
          'Cool u did provide the optional special skill. You should be special and focused on special'
        );
        console.log('and there is no better then making special skills');
        console.log(`You picked up ${specialSkill}`);
        console.log('Think always magic and going beyond.');
        console.log(
          'Think always of more special skills. And also what you should focus on first.'
        );
        console.log(
          'Remember as well the principle of a certain amount of something make the big difference.\
        The value of things is curved function. Not a line. And it depends.'
        );
        console.log('Magic always');
      } else {
        console.log(
          "Oooh you didn't provide the special Skill argument. It was optional so no error."
        );
      }

      if (opts.magic) {
        console.log(
          'You choose the Magic option.\n\
        You are a magician. Always be. Think and make beyond.'
        );
      } else {
        console.log(
          "Oooh no Magic option provided. it's an option. So optional no error."
        );
      }

      /**
       * Testing the order of arguments vs options
       */
      console.log(
        '> Now we are testing the args vs options order.\nFirst arg (args[0])'
      );
      if (typeof args[0] === 'string') {
        console.log(
          'First argument is the specialSkill argument. Cool as expected.'
        );
        console.log(`Value: ${args[0]}`);
      } else {
        console.log(
          'Something not right. Argument specialSkill is both an argument and was written first.'
        );
      }

      console.log('> Now testing the second arg (args[1])');
      if (typeof args[1] === 'string') {
        console.log(
          'You seem you provided the optional specialSkill arg. And conclusion: the order of args come before options.'
        );
      } else {
        console.log('All args:');
        console.log(args);
        if (Array.isArray(args[1])) {
          if (args.length === 2) {
            console.log(
              'You didnt provide the optional arg. better you do that. So you can test the not ordered args.'
            );
            console.log(`Options:`);
            console.log(args[1]);
          } else {
            console.log(
              "Hmmm unexpected! The order of options doesn't come second to args. but follow the call order. so if arg, option, arg, option. You would have arg1 options arg2"
            );
          }
        } else {
          if (typeof args[1] === 'string') {
            if (Array.isArray(args[0])) {
              console.log(
                'Super cool you provided special skill. And the way commander is that it take arguments first. Then options as an array as last arg. Make sense. That how i would like it to be and would do it myself.'
              );
            } else {
              console.log(
                'Hmmm something not right. Args[1] is correct but args[2] is not the expected options array.'
              );
            }
          }
        }
      }
    });

  program
    .command('testActionOptionsVsCommandOptions')
    .argument('[justOptional]')
    .option('--op1')
    .option('--op2')
    .action(function (justOptional, opts, cmd) {
      console.log('Here the different options and ways to access them:');
      console.log({
        arg: justOptional,
        programOpts: program.opts(),
        thisOpts: this.opts(),
        opts,
        cmdOpts: cmd.opts(),
      });
    });

  program
    .command('oneLine <specialWord> <specialSkill>')
    .description('One liner command with string parsing.')
    .action((specialWord, specialSkill) => {
      console.log('Args ::::: ');
      console.log({
        specialWord,
        specialSkill,
      });
    });

  try {
    console.log('Before parsing /////');
    await program.parse();
    console.log('After parsing /////');
  } catch (err) {
    console.log('any eror //////');
    console.log(err);
  }
})();
