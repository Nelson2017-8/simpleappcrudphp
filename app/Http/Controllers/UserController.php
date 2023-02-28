<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create(Request $request){
        if (!User::where("email", $request->email)->first()){
            $user = new User($request->all());
            $user->save();
            return response()->json(["result"=>true]);
        }

        return response()->json(["result"=>false]);

    }
    public function update(Request $request){
        try{
            $user = User::find($request->id);
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->photo_profile = $request->photo_profile;
            $user->birthdate = $request->birthdate;
            $user->update();
            return response()->json(["result"=>true]);
        }catch (\Exception $exception){
            return response()->json(["result"=>false]);
        }
    }
    public function find(Request $request){
        $user = User::where("email", $request->email)->first();
        return response()->json(['user'=>$user]);
    }
    public function query(){
        $users = User::all();
        return response()->json(['users'=>$users]);
    }
    public function delete(Request $request){
        try{
            User::destroy($request->id);
            return response()->json(["result"=>true]);
        }catch (\Exception $exception){
            return response()->json(["result"=>false]);
        }
    }
}
