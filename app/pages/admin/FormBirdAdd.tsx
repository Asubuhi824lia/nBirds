import { useState } from "react";
import { FieldBlock } from "./components/FieldBlock";
import { default as fieldsDescription } from "./utils/fieldsData.json";
import { type AddBirdForm, type FieldsDataIds, type FormAddBird } from "./utils";
import type { FieldBlocksKeys, FieldBlocksType } from "./components/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { textFieldBaseStyles } from "./utils/textFieldProps";
// TODO: при 1-м рендеринге — заполнение данных со "структуры данных" в "структуру полей"
const defaultBirdData: FormAddBird = {
  photoUrls: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Lophophanes_cristatus_-_01.jpg/500px-Lophophanes_cristatus_-_01.jpg",
  names: {
    nameLatin: "Lophophanes cristatus",
    nameMain: "Хохлатая синица",
    nameAlternatives: ["Гренадерка", "Гренадёр"],
    nameEtymologies: ["Своё название — гренадер — получила благодаря хорошо заметному коническому хохолку, похожему на шапки гренадеров — элитных пехотинцев XVII—XVIII веков."]
  },
  facts: {
    statisticFacts: ["В полевых условиях самцы и самки практически не отличимы."],
    similarSpecies: ["Более других видов синиц склонна к оседлому образу жизни."]
  }
}

/**
 * TODO: добавить ReadOnly-поле с названием рода, взятым из поля nameLatin
 *    мб добавить подгруз данных - дерева с более полной классификацией
 */
// TODO: дефолтное значение лучше получать из стейта "birdData" или напрямую "defaultBirdData"?
export const FormBirdAdd = () => {
  // TODO: change to use-react-hook
  const [birdData, setBirdData] = useState<FormAddBird>(defaultBirdData);
  // const [photoFiles, setPhotoFiles] = useState(new FormData());
  const { handleSubmit } = useForm<AddBirdForm>();

  const onSubmit: SubmitHandler<AddBirdForm> = () => {
    // console.log({
    //   photoUrls: birdData.photoUrls,
    //   names: { ...birdData.names },
    //   facts: { ...birdData.facts }
    // })
  }


  return (
    // TODO: цветовое оформление деталей формы полей — может задать юзер по палитре с картинки
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: 350 }}>
      <h3>Внесите данные о птице</h3>

      {(Object.entries(fieldsDescription) as [FieldBlocksKeys, FieldBlocksType][])
        .map(([blockId, value]) => (
          <div className="form-block" id={blockId} key={blockId}>
            <fieldset>
              <legend>{value.name}</legend>
              {/* TODO: показ не перелистыванием, а перепроявлением opacity */}
              {value.blocks.map(({ id, ...block }) => {
                // TODO: костыль?
                const defaultValue =
                  blockId === "blockImages"
                    ? defaultBirdData.photoUrls
                    : (
                      blockId === "blockNames"
                        ? defaultBirdData.names[id as FieldsDataIds[typeof blockId]]
                        : defaultBirdData.facts[id as FieldsDataIds[typeof blockId]]
                    )

                return (
                  <div className="field-block" key={`field-block-${id}`} id={id}>
                    <FieldBlock
                      blockId={blockId}
                      block={{ ...block, id }}
                      defaultValue={defaultValue}
                      handleAddData={({ key, data }) => {
                        switch (blockId) {
                          // TODO: Immer 
                          case "blockImages":
                            setBirdData(prev => ({ ...prev, [key]: data }));
                            break;
                          case "blockNames":
                            setBirdData({
                              photoUrls: birdData.photoUrls,
                              names: { ...birdData.names, [key]: data },
                              facts: { ...birdData.facts }
                            });
                            break;
                          case "blockFacts":
                            setBirdData({
                              photoUrls: birdData.photoUrls,
                              names: { ...birdData.names },
                              facts: { ...birdData.facts, [key]: data }
                            });
                            break;
                        }
                      }}
                    />
                  </div>
                )
              })}
            </fieldset>
          </div>
        )
        )
      }

      {/* TODO: <button type="submit" onClick={generateJSON}>Проверить карточку</button> */}
      <TextField
        margin="normal"
        size="small"
        type="submit"
        {...textFieldBaseStyles}
      />
    </form>
  );
}