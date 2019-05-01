import { Connection } from 'typeorm';
import { HttpMethod } from '../classes/route';
import { Route } from '../classes/route';
import { TreatmentModel } from '../models/treatment.model';
import { TreatmentTypeModel } from '../models/treatment-type.model';

export class UpdateTreatmentRoute extends Route {
    public getMethod() {
      return HttpMethod.POST;
    }
  
    public endpointName() {
      return '/update-treatment';
    }
  
    public async routeFunction(params, db: Connection) {
      if (!params.name || !params.description || !params.treatmentType || params.name.trim().length == 0 || params.description.trim().length == 0)
        throw 'Missing name, description or treatmentType parameters';
        
      const _id = (params.id != undefined && params.id !== null) ? params.id : null;
      const _name = params.name;
      const _description = params.description;
      const _treatmentType = params.treatmentType;
  
      const treatments = db.getRepository(TreatmentModel);
      const treatmentTypes = db.getRepository(TreatmentTypeModel);

      const treatment: TreatmentModel = await treatments.findOne({
        name: _name
      });
  
      if (treatment) {
        throw 'A treatment with that name already exist';
      } 

      const treatmentType: TreatmentTypeModel = await treatmentTypes.findOne({
        id: _treatmentType
      });
  
      if (!treatmentType) {
        throw 'A treatment type with that id does not exist';
      }   

      // Adding treatment
      if (_id === null)
      {   
        const new_treatment: TreatmentModel = new TreatmentModel();
        new_treatment.name = _name;
        new_treatment.description = _description;
        new_treatment.treatmentType = _treatmentType;    
        
        await treatments.save(new_treatment);
    
        return {
          ...params,
          message: 'Added treatment'
        };
      }
      // Updating treatment
      else
      {
        const treatment: TreatmentModel = await treatments.findOne({
          id: _id
        });
    
        if (!treatment) {
          throw 'A treatment with that id does not exist';
        }

        treatment.name = _name;
        treatment.description = _description;
        treatment.treatmentType = _treatmentType;    
        
        await treatments.save(treatment);
    
        return {
          ...params,
          message: 'Updated treatment'
        };
      }
    }
  }