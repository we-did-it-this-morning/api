import { Connection } from 'typeorm';
import { HttpMethod } from '../classes/route';
import { Route } from '../classes/route';
import { SymptomModel } from '../models/symptom.model';
import { SymptomTypeModel } from '../models/symptom-type.model';

export class UpdateSymptomRoute extends Route {
    public getMethod() {
      return HttpMethod.POST;
    }
  
    public endpointName() {
      return '/update-symptom';
    }
  
    public async routeFunction(params, db: Connection) {
      if (!params.name || !params.description || !params.symptomType || params.name.trim().length == 0 || params.description.trim().length == 0)
        throw 'Missing name, description or symptomType parameters';
        
      const _id = (params.id != undefined && params.id !== null) ? params.id : null;
      const _name = params.name;
      const _description = params.description;
      const _symptomType = params.symptomType;
  
      const symptoms = db.getRepository(SymptomModel);
      const symptomTypes = db.getRepository(SymptomTypeModel);

      const symptom: SymptomModel = await symptoms.findOne({
        name: _name
      });
  
      if (symptom) {
        throw 'A symptom with that name already exist';
      } 

      const symptomType: SymptomTypeModel = await symptomTypes.findOne({
        id: _symptomType
      });
  
      if (!symptomType) {
        throw 'A symptom type with that id does not exist';
      }   

      // Adding symptom
      if (_id === null)
      {   
        const new_symptom: SymptomModel = new SymptomModel();
        new_symptom.name = _name;
        new_symptom.description = _description;
        new_symptom.symptomType = _symptomType;    
        
        await symptoms.save(new_symptom);
    
        return {
          ...params,
          message: 'Added symptom'
        };
      }
      // Updating symptom
      else
      {
        const symptom: SymptomModel = await symptoms.findOne({
          id: _id
        });
    
        if (!symptom) {
          throw 'A symptom with that id does not exist';
        }

        symptom.name = _name;
        symptom.description = _description;
        symptom.symptomType = _symptomType;    
        
        await symptoms.save(symptom);
    
        return {
          ...params,
          message: 'Updated symptom'
        };
      }
    }
  }