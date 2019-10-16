import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

describe('Navigation', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });
  it('renders without crashing', () => {
    expect(wrapper);
  });
  it('toggles on toggle click', () => {
    const navbar = wrapper.find(Navbar);
    navbar.invoke('onToggle')();
    const newNavbar = wrapper.find(Navbar);
    expect(newNavbar.props().expanded).toBe(true);
  });
  it('collapses on nav link click', () => {
    const navbar = wrapper.find(Navbar);
    navbar.invoke('onToggle')();;
    const navLink = wrapper.find(Nav.Link).at(0);
    navLink.invoke('onClick')();
    const newNavbar = wrapper.find(Navbar);
    expect(newNavbar.props().expanded).toBe(false);
  });
});



