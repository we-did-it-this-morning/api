import { Connection } from 'typeorm';
import { HttpMethod } from './../classes/route';
import { Route } from './../classes/route';
import { TreatmentTypeModel } from '../models/treatment-type.model';

export class UpdateTreatmentTypeRoute extends Route {
    public getMethod() {
      return HttpMethod.POST;
    }
  
    public endpointName() {
      return '/update-treatment-type';
    }
  
    public async routeFunction(params, db: Connection) {
      if (!params.name || params.name.trim().length == 0)
        throw 'Missing name parameter';
        
      const _id = (params.id) ? params.id : null;
      const _name = params.name;
  
      const treatmentTypes = db.getRepository(TreatmentTypeModel);

      const treatmentType: TreatmentTypeModel = await treatmentTypes.findOne({
        name: _name
      });
  
      if (treatmentType) {
        throw 'A treatment type with that name already exist';
      }   

      // Adding treatment type
      if (_id === null)
      {   
        const new_treatmentType: TreatmentTypeModel = new TreatmentTypeModel();
        new_treatmentType.name = _name;  
        
        await treatmentTypes.save(new_treatmentType);
    
        return {
          ...params,
          message: 'Added treatment type'
        };
      }
      // Updating treatment type
      else
      {
        const treatmentType: TreatmentTypeModel = await treatmentTypes.findOne({
          id: _id
        });
    
        if (!treatmentType) {
          throw 'A treatment type with that id does not exist';
        }

        treatmentType.name = _name;  
        
        await treatmentTypes.save(treatmentType);
    
        return {
          ...params,
          message: 'Updated treatment type'
        };
      }
    }
  }