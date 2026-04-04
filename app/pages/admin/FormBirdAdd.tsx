import { FieldBlock } from "./components/FieldBlock";
import fieldsData from "./utils/fieldsData.json";

export const FormBirdAdd = () => {
  return (
    // TODO: цветовое оформление деталей формы полей — может задать юзер по палитре с картинки
    <form>
      <h3>Внесите данные о птице</h3>

      {Object.entries(fieldsData).map(([blockId, value]) => (
        <div className="form-block" id={blockId} key={blockId}>
          <fieldset>
            <legend>{value.name}</legend>
            {/* TODO: показ не перелистыванием, а перепроявлением opacity */}
            {value.blocks.map(({ id, ...block }) => (
              <div className="field-block" key={`field-block-${id}`} id={id}>
                <FieldBlock id={id} {...block} />
              </div>
            ))}
          </fieldset>
        </div>
      ))}
    </form>
  );
}