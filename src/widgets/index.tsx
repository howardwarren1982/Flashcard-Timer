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
  await plugin.app.registerWidget('sample_widget', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
  });

  plugin.event.addListener(AppEvents.URLChange, undefined, async ({ pathname }) => {
    const url = await plugin.window.getURL();
    if ((pathname as string).includes('/flashcards') || url.includes('/flashcards')) {
      const floatingWidgetId = await plugin.window.openWidgetInRightSidebar('sample_widget', {});
    }
  });

  plugin.event.addListener(AppEvents.QueueExit, undefined, () => {
    console.log('queue exit');
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
