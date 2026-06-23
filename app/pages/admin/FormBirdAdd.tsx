import { FieldBlock } from "./components/FieldBlock";
import { default as fieldsDescription } from "./utils/fieldsData.json";
import type { FieldBlocksKeys, FieldBlocksType } from "./components/types";
import { Form, Formik } from 'formik';
import { Button, Stack, Typography } from "@mui/material";
import { FieldBlockWrapper } from "./components/FieldBlock/FieldBlockWrapper";
import { defaultBirdData } from "./defaultData";

export interface FormValues {
  photoUrls?: Array<string>,
  photoFiles?: FileList,

  nameMain?: string,
  nameLatin?: string,
  nameAlternatives?: Array<string>,
  nameEtymologies?: Array<string>,

  interestFacts?: Array<string>,
  statisticFacts?: Array<string>,
  similarSpecies?: Array<string>
}
/**
 * TODO: добавить ReadOnly-поле с названием рода, взятым из поля nameLatin
 *    мб добавить подгруз данных - дерева с более полной классификацией
 */
// TODO: дефолтное значение лучше получать из стейта "birdData" или напрямую "defaultBirdData"?
export const FormBirdAdd = () => {

  return (
    // TODO: цветовое оформление деталей формы полей — может задать юзер по палитре с картинки
    <Formik<FormValues> // TODO: <FormValues> — на что влияет? В чем проявляется?
      initialValues={defaultBirdData}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {({ submitForm }) => (
        <Form style={{ width: 400, display: 'flex', flexDirection: "column", gap: 24 }}>
          <Typography variant="h5" align="center">Внесите данные о птице</Typography>

          <Stack direction="column" spacing={2}>
            {(Object.entries(fieldsDescription) as [FieldBlocksKeys, FieldBlocksType][])
              .map(([blockId, value]) => (
                <FieldBlockWrapper key={blockId} title={value.name}>
                  {/* TODO: показ не перелистыванием, а перепроявлением opacity */}
                  {value.blocks.map(({ id, ...block }) => (
                    // TODO: обдумать совместимость key и id
                    <div className="field-block" key={`field-block-${id}`} id={id}>
                      <FieldBlock
                        blockId={blockId}
                        block={{ ...block, id }}
                      />
                    </div>
                  )
                  )}
                </FieldBlockWrapper>
              ))
            }
          </Stack>

          {/* TODO: <button type="submit" onClick={generateJSON}>Проверить карточку</button> */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}