@extends('layouts.app')

@section('content')
<div id="users-show-page" data-user="{{json_encode($user)}}" />
@stop