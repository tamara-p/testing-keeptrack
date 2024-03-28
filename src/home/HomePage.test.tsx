import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import renderer from 'react-test-renderer';

describe('<HomePage/>', () => {
    
    test('should render without crashing', () =>{
        render(<HomePage/>);
        
    });

    test('snapshot', () => {
        const tree = renderer.create(<HomePage />).toJSON();
        expect(tree).toMatchSnapshot();
        //expecting a match
    });

});




