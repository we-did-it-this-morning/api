import { Connection } from 'typeorm';
import { HttpMethod } from './../classes/route';
import { Route } from './../classes/route';
import { SymptomTypeModel } from './../models/symptom-type.model';

export class UpdateSymptomTypeRoute extends Route {
    public getMethod() {
      return HttpMethod.POST;
    }
  
    public endpointName() {
      return '/update-symptom-type';
    }
  
    public async routeFunction(params, db: Connection) {
      if (!params.name || params.name.trim().length == 0)
        throw 'Missing name parameter';
        
      const _id = (params.id) ? params.id : null;
      const _name = params.name;
  
      const symptomTypes = db.getRepository(SymptomTypeModel);

      const symptomType: SymptomTypeModel = await symptomTypes.findOne({
        name: _name
      });
  
      if (symptomType) {
        throw 'A symptom type with that name already exist';
      }   

      // Adding symptom type
      if (_id === null)
      {   
        const new_symptomType: SymptomTypeModel = new SymptomTypeModel();
        new_symptomType.name = _name;  
        
        await symptomTypes.save(new_symptomType);
    
        return {
          ...params,
          message: 'Added symptom type'
        };
      }
      // Updating symptom type
      else
      {
        const symptomType: SymptomTypeModel = await symptomTypes.findOne({
          id: _id
        });
    
        if (!symptomType) {
          throw 'A symptom type with that id does not exist';
        }

        symptomType.name = _name;  
        
        await symptomTypes.save(symptomType);
    
        return {
          ...params,
          message: 'Updated symptom type'
        };
      }
    }
  }