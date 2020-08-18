import { Request, Response } from 'express';
import { format } from 'date-fns';
import CheckMemberPinCodeService from '../../../services/CheckMemberPinCodeService';

export default class MembersPinCodeCheckController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { pin_code } = request.body;
    const { employer_code } = request.params;

    const checkMemberPinCode = new CheckMemberPinCodeService();

    const pinCode = await checkMemberPinCode.execute({
      pin_code,
      employer_code,
    });

    const formattedBirthday = format(pinCode.employee.birthday, 'dd/MM/yyyy');

    const pinCodeResponse = {
      member_name: pinCode.employee.name,
      member_code: pinCode.member_code,
      member_personal_data: {
        father: pinCode.employee.father,
        mother: pinCode.employee.mother,
        hand: pinCode.employee.hand,
      },
      thumbnailHd: pinCode.employer.thumbnail,
      birthday: formattedBirthday,
    };

    return response.json(pinCodeResponse);
  }
}
