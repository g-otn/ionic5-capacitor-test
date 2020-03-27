# ionic5-capacitor-test
My Ionic 5 project to test some syntax, chores and plugins

## Running
Requirements: Node.js, native IDE (Android Studio/XCode) and [Ionic CLI](https://ionicframework.com/docs/cli)
1. Clone the project:
```bash
git clone https://github.com/g-otn/ionic5-capacitor-test.git
cd ionic5-capacitor-test
```
2. Install project dependencies: `npm i`
3. [Build ionic project, create the native project folder, and copy web assets](https://ionicframework.com/docs/cli/commands/capacitor-run):
   - You may need to specify the path to your native IDE at `capacitor.config.json`. An error will give instructions if needed
```bash
ionic capacitor run <platform>
# or
ionic capacitor run <platform> -l --external
```
4. Open your native IDE (if not already opened automatically) to the project's `android`/`ios` folder
5. Select a device/emulator and run the app
