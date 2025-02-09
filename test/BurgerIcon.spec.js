'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { assert, expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerIcon from '../src/BurgerIcon';

describe('BurgerIcon component', () => {

  let component;

  it('exists and is not undefined', () => {
    assert.isDefined(BurgerIcon, 'BurgerIcon component is defined');
  });

  describe('when rendered successfully', () => {

    beforeEach(() => {
      component = createShallowComponent(<BurgerIcon />);
    });

    it('contains three span elements', () => {
      let spanElements = component.props.children.filter((child) => {
        return child.type === 'span';
      });

      expect(spanElements).to.have.length(3);
    });

    it('contains a button element', () => {
      expect(component.props.children[3].type).to.equal('button');
    });

    it('has correct initial hover state', () => {
      expect(BurgerIcon.prototype.getInitialState().hover).to.be.false;
    });
  });

  describe('visual icon', () => {
    beforeEach(() => {
      component = createShallowComponent(<BurgerIcon />);
    });

    it('has the correct class', () => {
      expect(component.props.children[0].props.className).to.contain('bm-burger-bars');
      expect(component.props.children[1].props.className).to.contain('bm-burger-bars');
      expect(component.props.children[2].props.className).to.contain('bm-burger-bars');
    });

    it('has the correct styles', () => {
      const expected = {
        position: 'absolute',
        height: '20%',
        top: '0%',
        left: 0,
        right: 0,
        opacity: 1
      };
      expect(component.props.children[0].props.style).to.deep.equal(expected);
    });
  });

  describe('button', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<BurgerIcon />);
    });

    it('contains descriptive text', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      expect(button.innerHTML).to.equal('Open Menu');
    });

    it('responds to hover events', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.SimulateNative.mouseOver(button);
      expect(component.state.hover).to.be.true;
      TestUtils.SimulateNative.mouseOut(button);
      expect(component.state.hover).to.be.false;
    });

    it('behaves correctly when clicked', () => {
      let clickHandled = false;
      function handleClick() { clickHandled = true; }
      component = TestUtils.renderIntoDocument(<BurgerIcon onClick={ handleClick } />);
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.Simulate.click(button);
      expect(clickHandled).to.be.true;
    });

    it('has the correct styles', () => {
      component = createShallowComponent(<BurgerIcon />);
      const button = component.props.children[3];
      const expected = {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
        border: 'none',
        fontSize: 14,
        color: 'transparent',
        background: 'transparent',
        outline: 'none'
      };
      expect(button.props.style).to.deep.equal(expected);
    });
  });
});
