import React from 'react'
import Card from './Card';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export default function Accordian(props) {
  const { page, results } = props;
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            {page}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          {results.map((ele, idx) => <Card res={ele} key={idx} />)}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  )
}
