import { declareIndexPlugin, ReactRNPlugin, WidgetLocation, AppEvents } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  // Register settings
  await plugin.settings.registerStringSetting({
    id: 'seconds',
    title: 'How many seconds',
    defaultValue: '30',
  });

  // Register a  widget.
  await plugin.app.registerWidget('FlashcardTimer', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
