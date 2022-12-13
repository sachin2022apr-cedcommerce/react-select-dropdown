import { Card, FlexChild, FlexLayout, Select, Tag, TextStyles } from "@cedcommerce/ounce-ui";
import React, {useEffect, useState} from "react";

type objType = {
  label: string;
  value: string;
};
export default function Home() {
  const [highlightData, setHighlightData] = useState <objType[]> ([]);
  const [normalData, setNormalData] = useState <objType[]> ([]);
  const [selected, setSelected] = useState <string[]> ([]);

  // fetching dummy data 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        let tempHighlight: objType[] = [];
        let tempnormal: objType[] = [];
        json.forEach((item: any, index: number) => {
          if (index % 2)
            tempHighlight.push({label: item.name, value: item.name});
          else tempnormal.push({label: item.name, value: item.name});
        });
        setHighlightData([...tempHighlight]);
        setNormalData([...tempnormal]);
      });
  }, []);

  // highlighted data display
  const displayHighlight = (data: objType[]): objType[] => {
    var temp: any = data;
    temp.forEach((item: any, index: number) => {
      temp[index].label = ( 
        <TextStyles key={index} content={temp[index].label} fontweight="bold" />
      );
    });
    return [...temp];
  };

  const displayNormal = (data: objType[]): objType[] => {
    return [...data];
  };

  const handleSelect = (value: string) => {
    if (value !== "0" && value !== "1") {
      setSelected([...selected, value]);
    }
  };

  // remove function for tags
  const onRemove = (position: number): void => {
    let tempSelected = selected;
    tempSelected.splice(position, 1);
    setSelected([...tempSelected]);
  };

  return (
    <FlexLayout halign="center" spacing="loose">
      {selected.length ? (
        <FlexChild desktopWidth="66" mobileWidth="80" tabWidth="75">
          <Card title="selected" cardType="Bordered">
            <FlexLayout spacing="loose" valign="start">
              {selected.map((item, index) => {
                return (
                  <Tag key={index} destroy={() => onRemove(index)}>
                    {item}
                  </Tag>
                );
              })}
            </FlexLayout>
          </Card>
        </FlexChild>
      ) : null}

      <FlexChild desktopWidth="66" mobileWidth="80" tabWidth="75">
        <Select
          value={selected[selected.length - 1]}
          onChange={(value) => handleSelect(value)}
          options={[
            {
              group: displayHighlight(highlightData),
              label: (<TextStyles content="Highlight Catagory" fontweight="extraBold" />),
              value: "0",
            },
            {
              group: displayNormal(normalData),
              label: (<TextStyles content="General Catagory" fontweight="extraBold" />),
              value: "1",
            },
          ]}
          placeholder="Select Catagory"
          popoverContainer="body"
          thickness="thick"
        />
      </FlexChild>
    </FlexLayout>
  );
}