/* eslint-disable no-unused-vars */

const recieveTranscript = (results) => {
  const { isFinal, alternatives } = results;
  const { transcript } = alternatives[0].transcript;

  if (isFinal) {
    saveMessage();
    /**
            -- if a step -- 
            handleStep()
            -- if just a message --
            send the message object to the DB
            send the message to the front end

         */
  }
};

const handleStep = (transcript) => {};

/***

What do I want this to do
Each transcript, when final, should be it's own note - or - command
What does it mean to be a note?

{
    id: uuid
    message: transcript
    list: {  -or- null
        step: XX,
    } 
    option: {
        isOption: bool
        isChosenOption: bool
    }

}

What does it mean to be a command
You match a transcript against a config of commands
That will determine behavior
What commands should exist?
Should we record commands?

Required (controls):
- record
- pause recording (are these different if there is no infinite recording?)
- stop recording


Required (List):
- Create a list
- Add item to list
- Move item to index in list (if index does not exist or is last index, make last item)
- Remove item from list

Stretches:
- Create options tree (step X child 1, step X child 2, step X child 3)
- Add steps to option

 */

module.exports = {
  printTranscript,
};
