import { render, screen } from '@testing-library/react';
import ProjectCard from '../ProjectCard';
import { Project} from '../Project';
import React from 'react';
import { MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe("<ProjectCard/>", () =>{
    let project: Project;
    let handleEdit: jest.Mock;

    const setup = () => 
        render(
            <MemoryRouter>
        <ProjectCard project = {project} onEdit={handleEdit} />
        </MemoryRouter>
        );

    beforeEach(() =>{
        project = new Project({
            id: 1,
            name: "Random name",
            description: "describing the thing",
            budget: 100,
        });
        handleEdit = jest.fn();
    });

    it("should initially render", () => {
        setup();
    });

    it('renders project properly', () => {
       
            setup();
        
        expect(screen.getByRole('heading')).toHaveTextContent(project.name);
        //screen.debug(document);
        screen.getByText(/describing the thing\.\.\./i);
        screen.getByText(/budget : 100/i);
        // searching for a text in the projcard
        
    });

    it('handler called when edit clicked', async () =>{
        
         setup();
        
        const view = userEvent.setup();
        await view.click(screen.getByRole('button', { name: /edit/i}));
        expect(handleEdit).toBeCalledTimes(1);
        expect(handleEdit).toBeCalledWith(project);
    });

    test('snapshot', () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                <ProjectCard project = {project} onEdit={handleEdit} />
                </MemoryRouter>
            )
            .toJSON();
            expect(tree).toMatchSnapshot();
    }
    );
});