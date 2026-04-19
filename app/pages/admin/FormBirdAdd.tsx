import { useState } from "react";
import { FieldBlock } from "./components/FieldBlock";
import fieldsData from "./utils/fieldsData.json";
import { type FormAddBird } from "./utils";
import type { FieldBlocksKeys, FieldBlocksType } from "./components/types";

const defaultBirdData = {
  names: { nameLatin: "" },
  facts: {}
}

export const FormBirdAdd = () => {
  // TODO: change to use-react-hook
  const [birdData, setBirdData] = useState<FormAddBird>(defaultBirdData);
  // const [photoFiles, setPhotoFiles] = useState(new FormData());

  const generateJSON = () => {
    console.log({
      photoUrls: birdData.photoUrls,
      names: { ...birdData.names },
      facts: { ...birdData.facts }
    })
  }

  return (
    // TODO: цветовое оформление деталей формы полей — может задать юзер по палитре с картинки
    <form onSubmit={e => e.preventDefault()}>
      <h3>Внесите данные о птице</h3>

      {(Object.entries(fieldsData) as [FieldBlocksKeys, FieldBlocksType][])
        .map(([blockId, value]) => (
          <div className="form-block" id={blockId} key={blockId}>
            <fieldset>
              <legend>{value.name}</legend>
              {/* TODO: показ не перелистыванием, а перепроявлением opacity */}
              {value.blocks.map(({ id, ...block }) => (
                <div className="field-block" key={`field-block-${id}`} id={id}>
                  <FieldBlock
                    blockId={blockId}
                    block={{ ...block, id }}
                    handleAddData={({ key, data }) => {
                      switch (blockId) {
                        // TODO: Immer 
                        case "blockImages":
                          setBirdData(prev => ({ ...prev, [key]: data }));
                          break;
                        case "blockNames":
                          setBirdData({
                            photoUrls: birdData.photoUrls,
                            names: { ...birdData.names, [key]: Array.isArray(data) ? [...data] : data },
                            facts: { ...birdData.facts }
                          });
                          break;
                        case "blockFacts":
                          setBirdData({
                            photoUrls: birdData.photoUrls,
                            names: { ...birdData.names },
                            facts: { ...birdData.facts, [key]: data && [...data] }
                          });
                          break;
                      }
                    }}
                  />
                </div>
              ))}
            </fieldset>
          </div>
        ))
      }

      <button type="submit" onClick={generateJSON}>Проверить карточку</button>
    </form>
  );
}