# Customizing styles for tabs

## Deactivate all styles

To deactivate all default styles, run `Tabs.setUseDefaultStyles(false)` once.

```js
Tabs.setUseDefaultStyles(false); // use once anywhere
export default class App extends Component {
  render() {
    return (
      <Tabs>
        <TabList}>
          <Tab>Foo</Tab>
          <Tab>Bar</Tab>
          <Tab>Baz</Tab>
        </TabList>
        <TabPanel>
          <h2>Hello from Foo</h2>
        </TabPanel>
        <TabPanel>
          <h2>Hello from Bar</h2>
        </TabPanel>
        <TabPanel>
          <h2>Hello from Baz</h2>
        </TabPanel>
      </Tabs>
    );
  }
}
```

## Declaring active class name of tabs

Can declare tab active class name with `activeTabClassName` prop.

```js
export default class App extends Component {
  render() {
    return (
      <Tabs>
        <TabList activeTabClassName="my-personal-styles">
          <Tab>Foo</Tab>
          <Tab>Bar</Tab>
          <Tab>Baz</Tab>
        </TabList>
        <TabPanel>
          <h2>Hello from Foo</h2>
        </TabPanel>
        <TabPanel>
          <h2>Hello from Bar</h2>
        </TabPanel>
        <TabPanel>
          <h2>Hello from Baz</h2>
        </TabPanel>
      </Tabs>
    );
  }
}
```

However, this class name is cascaded by the internal styles, so properties like text color can't be changed.

## Styles on `TabPanel`

You can use the `classname` prop on `TabPanel`s to change the classnames.

## Class names overriding

The `activeTabClassName` class styles are overrided by the styles in children

```jsx
<TabList activeTabClassName={cx(styles.one)}>
  <Tab className={cx(styles.two)}>Foo</Tab> {/* `two` overrides `one` */}
  <Tab className={cx(styles.two)}>Bar</Tab>
  <Tab className={cx(styles.two)}>Baz</Tab>
</TabList>
```

However, `activeTabClassName` does override its own `className`.

```jsx
{/* one overrides three on active tab */}
<TabList className={cx(styles.three)} activeTabClassName={cx(styles.one)}>
  <Tab>Foo</Tab>
  <Tab>Bar</Tab>
  <Tab>Baz</Tab>
</TabList>
```

## Solved

Based on the following snippet

```jsx
<TabList className={cx(styles.five)} activeTabClassName={cx(styles.test)}>
  <Tab className={cx(styles.three)}>Foo</Tab>
  <Tab className={cx(styles.three)}>Bar</Tab>
  <Tab className={cx(styles.three)}>Baz</Tab>
</TabList>
```

Class `five` applies to the the `<ul>` (`<TabList>`) housing the `<li>`s (`<Tab>`). Both the active class name and the class name of each tab is applied to the `<li>`s. The active class is appended last (not particularly relevant). However, because both classes are applied, and only class names are applied, both will have the same specificity (they are only class name selectors `.className`), and so they will cascade with the order in which they are defined in the stylesheet. So it is important that if the behavior of the `activeTabClassName` is to override properties from the "regular" class name, then it must be declared after the class name for each `<Tab>`.
